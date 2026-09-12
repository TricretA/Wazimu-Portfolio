import { useEffect, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { site } from '../data/site';
import { legalDocs, type LegalBlock, type LegalDoc } from '../data/legal';
import { routeLink } from '../lib/route';

interface Props {
  doc: LegalDoc;
}

function Block({ block }: { block: LegalBlock }) {
  if (block.kind === 'list') {
    return (
      <ul className="mt-3 flex flex-col gap-2.5">
        {block.items.map((item) => (
          <li
            key={item}
            className="relative pl-5 text-[0.92rem] leading-relaxed text-[var(--soft)] before:absolute before:left-0 before:top-[0.62em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[rgb(var(--cat-rgb))] before:opacity-70 before:content-['']"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (block.kind === 'note') {
    return (
      <p className="mt-4 rounded-2xl border border-[rgba(164,255,231,0.16)] bg-[rgba(164,255,231,0.06)] px-4 py-3 text-[0.92rem] font-semibold leading-relaxed text-[var(--success)]">
        {block.text}
      </p>
    );
  }

  return (
    <p className="mt-3 text-[0.95rem] leading-[1.75] text-[var(--soft)]">{block.text}</p>
  );
}

/**
 * Renders one legal document. Both the privacy policy and the terms use this —
 * they are the same shape, and platform reviewers read them side by side.
 *
 * Deliberately plainer than the rest of the site: no aurora tricks inside the
 * document itself, because this is a page people are meant to actually read.
 */
export default function LegalPage({ doc }: Props) {
  const reduce = useReducedMotion();
  const other = legalDocs.find((entry) => entry.slug !== doc.slug)!;

  // A client-side route change does not reset the scroll position or retitle
  // the tab the way a real navigation would, so do both here.
  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = `${doc.title} | ${site.workName}`;

    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute('content') ?? null;
    meta?.setAttribute('content', doc.tagline);

    return () => {
      document.title = previousTitle;
      if (previousDescription !== null) meta?.setAttribute('content', previousDescription);
    };
  }, [doc]);

  return (
    /* The glass panel and bullets read `--cat`; the document is not a project,
       so the hue is set here rather than inherited from a category. */
    <div
      className="page-shell"
      style={{ '--cat': 'var(--blue)', '--cat-rgb': 'var(--rgb-blue)' } as CSSProperties}
    >
      <div className="aurora-layer" aria-hidden="true" />

      {/* Slim bar — identity and the way back, nothing else to navigate to. */}
      <header className="relative z-[2] border-b border-[var(--line-soft)]">
        <div className="shell-width flex items-center justify-between gap-4 py-4">
          <a
            {...routeLink('/')}
            className="flex min-w-0 items-center gap-3"
            aria-label={`${site.name} — back to home`}
          >
            <img
              src="/logo.webp"
              alt=""
              width={44}
              height={44}
              className="h-10 w-10 flex-shrink-0 rounded-full border border-[var(--line)] object-cover"
            />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[0.9rem] font-bold tracking-tight">
                {site.name}
              </span>
              <span className="mt-0.5 block font-mono text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[var(--faint)]">
                {site.workName}
              </span>
            </span>
          </a>

          <a
            {...routeLink('/')}
            className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-[var(--line)] bg-white/5 px-3.5 py-2 text-[0.8rem] font-semibold text-[var(--soft)] transition-colors hover:bg-white/10 hover:text-[var(--text)] sm:px-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back to home</span>
            <span className="sm:hidden">Home</span>
          </a>
        </div>
      </header>

      <main className="page-content">
        <div className="shell-width max-w-[760px] pb-20 pt-14 sm:pb-28 sm:pt-20">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mono-tag">{doc.eyebrow}</span>
            <h1 className="section-title mt-3">{doc.title}</h1>
            <p className="mt-4 max-w-[60ch] text-[0.95rem] leading-[1.7] text-[var(--muted)]">
              {doc.tagline}
            </p>
            <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--faint)]">
              Last updated {doc.updated}
            </p>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel mt-10 px-5 py-8 sm:px-9 sm:py-11"
          >
            <p className="text-[1.02rem] leading-[1.7] text-[var(--text)]">{doc.intro}</p>

            {doc.sections.map((section, index) => (
              <section
                key={section.heading}
                className={
                  index === 0
                    ? 'mt-9'
                    : 'mt-9 border-t border-[var(--line-soft)] pt-9'
                }
              >
                <h2 className="m-0 text-[1.12rem] font-semibold tracking-[-0.01em] text-[var(--text)]">
                  {section.heading}
                </h2>
                {section.blocks.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} />
                ))}
              </section>
            ))}

            {/* Reviewers look for a reachable owner; so do users. */}
            <section className="mt-9 border-t border-[var(--line-soft)] pt-9">
              <h2 className="m-0 text-[1.12rem] font-semibold tracking-[-0.01em] text-[var(--text)]">
                Contact
              </h2>
              <p className="mt-3 text-[0.95rem] leading-[1.75] text-[var(--soft)]">
                Questions about this {doc.title.toLowerCase()}? Reach {site.name} directly.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${site.email}`}
                  className="secondary-button w-full sm:w-auto"
                >
                  <Mail className="h-4 w-4" /> {site.email}
                </a>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-button w-full sm:w-auto"
                >
                  <FaWhatsapp className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </section>
          </motion.article>

          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <a {...routeLink('/')} className="primary-button">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </a>
            <a
              {...routeLink(`/${other.slug}`)}
              className="inline-flex items-center gap-1 text-xs font-medium text-[var(--muted)] transition-colors hover:text-[var(--text)]"
            >
              Read the {other.title} <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </main>

      <footer className="section-divider relative z-[1]">
        <div className="shell-width py-7 text-center">
          <p className="m-0 text-xs text-[var(--faint)]">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
