import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { site } from '../data/site';
import { services } from '../data/services';
import { contactFaqs } from '../data/faqs';
import { pathFor, routeLink } from '../lib/route';
import PageShell from './PageShell';

/**
 * Contact at a real URL, with the answers a buyer wants before they message.
 *
 * "How much?", "how long?", "do you work remotely?" are the questions that
 * decide whether someone gets in touch, and they are exactly the questions an
 * answer engine gets asked on someone's behalf. Answering them here in plain
 * text — rather than leaving them to a conversation — is the whole point.
 */

export default function ContactPage() {
  return (
    <PageShell
      crumbs={[{ label: 'Home', path: pathFor.home() }, { label: 'Contact' }]}
      eyebrow="Contact"
      title="What's the one thing slowing you down?"
      lede={`Tell me what is broken and you get a fixed figure in writing. Fastest route is WhatsApp on ${site.phone}; email works just as well.`}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card flex flex-col items-start gap-2 p-5 transition-transform hover:-translate-y-1"
        >
          <FaWhatsapp className="h-5 w-5 text-[var(--amber)]" aria-hidden="true" />
          <span className="text-[0.92rem] font-semibold tracking-tight">WhatsApp</span>
          <span className="text-[0.8rem] text-[var(--muted)]">{site.phone}</span>
        </a>

        <a
          href={`mailto:${site.email}`}
          className="glass-card flex flex-col items-start gap-2 p-5 transition-transform hover:-translate-y-1"
        >
          <Mail className="h-5 w-5 text-[var(--amber)]" aria-hidden="true" />
          <span className="text-[0.92rem] font-semibold tracking-tight">Email</span>
          <span className="break-all text-[0.8rem] text-[var(--muted)]">{site.email}</span>
        </a>

        <a
          href={site.phoneHref}
          className="glass-card flex flex-col items-start gap-2 p-5 transition-transform hover:-translate-y-1"
        >
          <Phone className="h-5 w-5 text-[var(--amber)]" aria-hidden="true" />
          <span className="text-[0.92rem] font-semibold tracking-tight">Phone</span>
          <span className="text-[0.8rem] text-[var(--muted)]">{site.phone}</span>
        </a>
      </div>

      <section className="mt-12" aria-label="What I can help with">
        <h2 className="mono-tag">What I can help with</h2>
        <ul className="mt-4 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-[0.85rem] text-[var(--muted)]">
          {services.map((service) => (
            <li key={service.slug}>
              <a
                {...routeLink(pathFor.service(service.slug))}
                className="transition-colors hover:text-[var(--text)]"
              >
                {service.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14" aria-label="Before you ask">
        <h2 className="section-title !text-[1.35rem]">Before you ask</h2>
        <dl className="mt-6 m-0 space-y-5">
          {contactFaqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-xl border border-[var(--line-soft)] bg-white/[0.03] p-5 sm:p-6"
            >
              <dt className="m-0 text-[0.98rem] font-semibold leading-snug tracking-tight">
                {faq.question}
              </dt>
              <dd className="m-0 mt-2.5 text-[0.88rem] leading-[1.75] text-[var(--muted)]">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-10 text-[0.85rem] text-[var(--muted)]">
        Prefer to look before you talk?{' '}
        <a
          {...routeLink(pathFor.workIndex())}
          className="font-semibold text-[var(--text)] underline decoration-[var(--line)] underline-offset-4 transition-colors hover:decoration-[var(--text)]"
        >
          Read the case studies
        </a>
        , or{' '}
        <a
          href={site.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-[var(--text)] underline decoration-[var(--line)] underline-offset-4 transition-colors hover:decoration-[var(--text)]"
        >
          the CV <ArrowUpRight className="h-3 w-3" />
        </a>
        .
      </p>
    </PageShell>
  );
}
