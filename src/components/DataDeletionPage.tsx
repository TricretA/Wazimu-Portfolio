import { useMemo, useRef, useState, type FormEvent } from 'react';
import { AlertTriangle, CheckCircle2, Clock, Mail, Send, ShieldAlert } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { site } from '../data/site';
import { DELETION_ENDPOINT, DELETION_WINDOW_HOURS, dataDeletion } from '../data/legal';
import LegalShell from './LegalShell';

interface FormValues {
  business: string;
  phone: string;
  email: string;
  reason: string;
}

const EMPTY: FormValues = { business: '', phone: '', email: '', reason: '' };

type FieldName = keyof FormValues | 'confirm';
type Errors = Partial<Record<FieldName, string>>;

const FIELD_ORDER: FieldName[] = ['business', 'phone', 'email', 'reason', 'confirm'];

/**
 * Deliberately loose. A Kenyan number may arrive as 07…, 2547…, or +2547…,
 * and rejecting a real requester's number is worse than accepting a typo —
 * the request is reviewed by a person before anything is deleted.
 */
function validate(values: FormValues, confirmed: boolean): Errors {
  const errors: Errors = {};

  if (!values.business.trim()) errors.business = 'Enter the business name on the account.';

  const digits = values.phone.replace(/\D/g, '');
  if (!values.phone.trim()) errors.phone = 'Enter the phone number linked to your account.';
  else if (digits.length < 9) errors.phone = 'That does not look like a complete phone number.';

  if (!values.email.trim()) errors.email = 'Enter an email address we can reply to.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Enter a valid email address.';

  if (!values.reason.trim()) errors.reason = 'Tell us why you want your data deleted.';
  else if (values.reason.trim().length < 10) errors.reason = 'Add a little more detail.';

  if (!confirmed) errors.confirm = 'You must confirm you understand this cannot be undone.';

  return errors;
}

/** Something the requester can quote when following up. */
function makeReference() {
  const stamp = Date.now().toString(36).toUpperCase();
  const noise = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DEL-${stamp}-${noise}`;
}

interface FieldProps {
  name: keyof FormValues;
  label: string;
  hint?: string;
  placeholder: string;
  type?: string;
  multiline?: boolean;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

function Field({
  name,
  label,
  hint,
  placeholder,
  type = 'text',
  multiline,
  value,
  error,
  onChange
}: FieldProps) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ');

  const shared = {
    id: name,
    name,
    value,
    placeholder,
    'aria-invalid': Boolean(error),
    'aria-describedby': describedBy || undefined,
    onChange: (event: { target: { value: string } }) => onChange(event.target.value)
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[0.82rem] font-semibold tracking-[-0.005em] text-[var(--soft)]"
      >
        {label} <span className="text-[var(--danger)]">*</span>
      </label>
      {hint && (
        <p id={hintId} className="mt-1 text-[0.76rem] leading-relaxed text-[var(--faint)]">
          {hint}
        </p>
      )}

      <div className="mt-2">
        {multiline ? (
          <textarea {...shared} rows={4} className="text-area" />
        ) : (
          <input {...shared} type={type} className="text-input" />
        )}
      </div>

      {error && (
        <p id={errorId} className="mt-2 text-[0.78rem] font-medium text-[var(--danger)]">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * The data deletion request page.
 *
 * Meta requires a reachable data-deletion route for any app handling WhatsApp
 * user data. The form posts to `DELETION_ENDPOINT` when one is configured; see
 * `data/legal.ts`. Until then the confirmation screen hands the requester a
 * prefilled WhatsApp and email route carrying the same details, so a request
 * made today still reaches a person rather than being quietly dropped.
 */
export default function DataDeletionPage() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [reference, setReference] = useState('');
  const [submitted, setSubmitted] = useState<FormValues>(EMPTY);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (name: keyof FormValues) => (value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    // Clear the message as soon as the field is touched — re-validating on
    // every keystroke would scold someone halfway through typing an email.
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current));
  };

  /** The same request, written out for the WhatsApp and email fallback. */
  const fallbackMessage = useMemo(
    () =>
      [
        'Data deletion request',
        `Reference: ${reference}`,
        `Business: ${submitted.business}`,
        `Phone: ${submitted.phone}`,
        `Email: ${submitted.email}`,
        `Reason: ${submitted.reason}`
      ].join('\n'),
    [reference, submitted]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(values, confirmed);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = FIELD_ORDER.find((name) => found[name]);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"], #${first}`)?.focus();
      return;
    }

    const ticket = makeReference();
    setStatus('sending');

    if (DELETION_ENDPOINT) {
      try {
        const response = await fetch(DELETION_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reference: ticket,
            business: values.business.trim(),
            phone: values.phone.trim(),
            email: values.email.trim(),
            reason: values.reason.trim(),
            submittedAt: new Date().toISOString()
          })
        });
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
      } catch {
        setStatus('failed');
        return;
      }
    }

    setReference(ticket);
    setSubmitted({
      business: values.business.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      reason: values.reason.trim()
    });
    setStatus('sent');
  }

  if (status === 'sent') {
    return (
      <LegalShell
        slug="data"
        eyebrow={dataDeletion.eyebrow}
        title={dataDeletion.title}
        tagline={dataDeletion.tagline}
      >
        <div className="glass-panel px-5 py-9 sm:px-9 sm:py-11" aria-live="polite">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(164,255,231,0.24)] bg-[rgba(164,255,231,0.1)]">
              <CheckCircle2 className="h-7 w-7 text-[var(--success)]" />
            </span>
            <h2 className="mt-5 text-[1.35rem] font-semibold tracking-[-0.015em] text-[var(--text)]">
              Request received
            </h2>
            <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-[1.7] text-[var(--soft)]">
              Your data deletion request has been logged against the details you provided.
            </p>

            <p className="mt-5 rounded-full border border-[var(--line)] bg-white/5 px-4 py-2 font-mono text-[0.78rem] tracking-[0.08em] text-[var(--text)]">
              {reference}
            </p>
            <p className="mt-2 text-[0.76rem] text-[var(--faint)]">
              Keep this reference if you need to follow up.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[rgba(145,183,255,0.16)] bg-[rgba(145,183,255,0.07)] px-4 py-4">
              <div className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--blue)]">
                <Clock className="h-3.5 w-3.5" /> Timeline
              </div>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-[var(--soft)]">
                The deletion process takes up to {DELETION_WINDOW_HOURS} hours from the moment your
                request is received.
              </p>
            </div>
            <div className="rounded-2xl border border-[rgba(255,124,146,0.18)] bg-[rgba(255,124,146,0.08)] px-4 py-4">
              <div className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--danger)]">
                <ShieldAlert className="h-3.5 w-3.5" /> Irreversible
              </div>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-[var(--soft)]">
                Once the deletion runs it cannot be undone. Your records cannot be restored
                afterwards.
              </p>
            </div>
          </div>

          {/*
            No endpoint is wired up yet, so the browser has nowhere to deliver
            this. Rather than let the request evaporate, hand the requester the
            same details prefilled on a channel that does reach a person.
          */}
          {!DELETION_ENDPOINT && (
            <div className="mt-8 border-t border-[var(--line-soft)] pt-8">
              <h3 className="m-0 text-[1rem] font-semibold tracking-[-0.01em] text-[var(--text)]">
                One last step
              </h3>
              <p className="mt-2 text-[0.9rem] leading-[1.7] text-[var(--soft)]">
                Send the request through so it reaches {site.name} directly. Both options are
                already filled in with the details above — you only need to press send.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`https://wa.me/${site.phone.replace(/\D/g, '')}?text=${encodeURIComponent(fallbackMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-button whatsapp-button w-full sm:w-auto"
                >
                  <FaWhatsapp className="h-4 w-4" /> Send on WhatsApp
                </a>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    `Data deletion request ${reference}`
                  )}&body=${encodeURIComponent(fallbackMessage)}`}
                  className="secondary-button w-full sm:w-auto"
                >
                  <Mail className="h-4 w-4" /> Send by email
                </a>
              </div>
            </div>
          )}
        </div>
      </LegalShell>
    );
  }

  return (
    <LegalShell
      slug="data"
      eyebrow={dataDeletion.eyebrow}
      title={dataDeletion.title}
      tagline={dataDeletion.tagline}
    >
      <div className="glass-panel px-5 py-8 sm:px-9 sm:py-11">
        <p className="text-[1.02rem] leading-[1.7] text-[var(--text)]">{dataDeletion.intro}</p>

        {/* Stated before the form, not after it — the warning is only useful
            while the decision is still being made. */}
        <div className="mt-7 rounded-2xl border border-[rgba(255,124,146,0.18)] bg-[rgba(255,124,146,0.07)] px-4 py-4 sm:px-5">
          <div className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--danger)]">
            <AlertTriangle className="h-3.5 w-3.5" /> Before you submit
          </div>
          {dataDeletion.notice.map((line) => (
            <p key={line} className="mt-2 text-[0.88rem] leading-[1.65] text-[var(--soft)]">
              {line}
            </p>
          ))}
        </div>

        <section className="mt-9 border-t border-[var(--line-soft)] pt-9">
          <h2 className="m-0 text-[1.12rem] font-semibold tracking-[-0.01em] text-[var(--text)]">
            What gets deleted
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5">
            {dataDeletion.removes.map((item) => (
              <li
                key={item}
                className="relative pl-5 text-[0.92rem] leading-relaxed text-[var(--soft)] before:absolute before:left-0 before:top-[0.62em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[rgb(var(--cat-rgb))] before:opacity-70 before:content-['']"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-9 border-t border-[var(--line-soft)] pt-9">
          <h2 className="m-0 text-[1.12rem] font-semibold tracking-[-0.01em] text-[var(--text)]">
            Your details
          </h2>
          <p className="mt-2 text-[0.88rem] leading-relaxed text-[var(--muted)]">
            These are used to find your records and to confirm the request is yours.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-5">
            <Field
              name="business"
              label="Business name"
              placeholder="The name on your account"
              value={values.business}
              error={errors.business}
              onChange={set('business')}
            />
            <Field
              name="phone"
              label="Phone number"
              hint="The WhatsApp number linked to your account."
              placeholder="+254 7XX XXX XXX"
              type="tel"
              value={values.phone}
              error={errors.phone}
              onChange={set('phone')}
            />
            <Field
              name="email"
              label="Email address"
              hint="Where confirmation of the deletion will be sent."
              placeholder="you@business.co.ke"
              type="email"
              value={values.email}
              error={errors.email}
              onChange={set('email')}
            />
            <Field
              name="reason"
              label="Reason for deletion"
              placeholder="Tell us why you want your data removed."
              multiline
              value={values.reason}
              error={errors.reason}
              onChange={set('reason')}
            />

            <div>
              <label
                htmlFor="confirm"
                className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[var(--line-soft)] bg-white/[0.03] px-4 py-3.5 transition-colors hover:border-[var(--line)]"
              >
                <input
                  id="confirm"
                  name="confirm"
                  type="checkbox"
                  checked={confirmed}
                  aria-invalid={Boolean(errors.confirm)}
                  aria-describedby={errors.confirm ? 'confirm-error' : undefined}
                  onChange={(event) => {
                    setConfirmed(event.target.checked);
                    setErrors((current) =>
                      current.confirm ? { ...current, confirm: undefined } : current
                    );
                  }}
                  className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[var(--danger)]"
                />
                <span className="text-[0.86rem] leading-relaxed text-[var(--soft)]">
                  I understand this deletion is permanent, cannot be reversed, and that my records
                  cannot be recovered once removed.
                </span>
              </label>
              {errors.confirm && (
                <p id="confirm-error" className="mt-2 text-[0.78rem] font-medium text-[var(--danger)]">
                  {errors.confirm}
                </p>
              )}
            </div>

            {status === 'failed' && (
              <p
                role="alert"
                className="rounded-2xl border border-[rgba(255,124,146,0.2)] bg-[rgba(255,124,146,0.08)] px-4 py-3 text-[0.86rem] leading-relaxed text-[var(--danger)]"
              >
                That did not go through. Check your connection and try again, or send the request
                over WhatsApp at {site.phone}.
              </p>
            )}

            <button type="submit" disabled={status === 'sending'} className="primary-button">
              <Send className="h-4 w-4" />
              {status === 'sending' ? 'Submitting…' : 'Submit deletion request'}
            </button>

            <p className="m-0 text-center text-[0.76rem] leading-relaxed text-[var(--faint)]">
              Prefer to ask a person? Message {site.phone} on WhatsApp or email {site.email}.
            </p>
          </form>
        </section>
      </div>
    </LegalShell>
  );
}
