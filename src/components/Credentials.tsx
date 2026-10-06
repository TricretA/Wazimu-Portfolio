import { useState, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Award } from 'lucide-react';
import { credentials, type Credential } from '../data/credentials';

/**
 * Certificate artwork. Accredible's embed endpoint resolves to a fresh,
 * short-lived signed URL on every request, so a failed load is routine
 * (an expired link, a network hiccup) rather than exceptional — this falls
 * back to a labelled placeholder that still names the credential, rather
 * than a broken-image icon.
 */
function CertificateFigure({ credential }: { credential: Credential }) {
  const [errored, setErrored] = useState(false);
  const label = `${credential.title} certificate, awarded to ${credential.awardedTo} by ${credential.issuer} — certificate ID ${credential.certificateId}`;

  if (errored) {
    return (
      <div className="credential-fallback" role="img" aria-label={label}>
        <Award className="h-7 w-7 text-[var(--faint)]" strokeWidth={1.5} />
        <span className="mt-3 px-4 text-center text-[0.76rem] leading-relaxed text-[var(--muted)]">
          Certificate preview unavailable. Use the link below to view it.
        </span>
      </div>
    );
  }

  return (
    <img
      src={credential.imageUrl}
      alt={label}
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
      className="credential-figure"
    />
  );
}

export default function Credentials() {
  const reduce = useReducedMotion();

  return (
    <section id="credentials" className="section-band section-divider relative">
      <div className="shell-width">
        <motion.div
          initial={{ y: reduce ? 0 : 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-head"
        >
          <h2 className="section-title">Credentials &amp; training</h2>
          <p className="section-copy">
            Formal training completed alongside the work itself, kept current and listed
            honestly — not a wall of badges.
          </p>
        </motion.div>

        {credentials.map((credential) => (
          <motion.article
            key={credential.slug}
            initial={{ y: reduce ? 0 : 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ '--cat-rgb': 'var(--rgb-amber)' } as CSSProperties}
            className="glass-card mx-auto mt-12 max-w-3xl overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
              <div className="flex items-center justify-center border-b border-[var(--line-soft)] p-6 md:border-b-0 md:border-r md:p-7">
                <CertificateFigure credential={credential} />
              </div>

              <div className="p-6 text-left md:p-7">
                <div className="mono-tag !text-[var(--amber)]">Credential</div>
                <h3 className="mt-2 text-[1.1rem] font-semibold tracking-tight">
                  {credential.title}
                </h3>
                <p className="mt-1 text-[0.8rem] text-[var(--muted)]">
                  {credential.issuer} · Awarded to {credential.awardedTo}
                </p>

                <p className="mt-4 text-[0.86rem] leading-relaxed text-[var(--soft)]">
                  {credential.description}
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[var(--line-soft)] pt-5 sm:grid-cols-3">
                  <div>
                    <dt className="mono-tag">Issued</dt>
                    <dd className="mt-1 text-[0.8rem] text-[var(--soft)]">{credential.issued}</dd>
                  </div>
                  <div>
                    <dt className="mono-tag">Valid through</dt>
                    <dd className="mt-1 text-[0.8rem] text-[var(--soft)]">
                      {credential.validThrough}
                    </dd>
                  </div>
                  <div>
                    <dt className="mono-tag">Certificate ID</dt>
                    <dd className="mt-1 font-mono text-[0.8rem] text-[var(--soft)]">
                      {credential.certificateId}
                    </dd>
                  </div>
                </dl>

                <a
                  href={credential.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-button mt-6"
                >
                  View certificate <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
