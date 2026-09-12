import { useEffect, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { site } from '../data/site';
import { legalPages, type LegalSlug } from '../data/legal';
import { routeLink } from '../lib/route';

interface Props {
  slug: LegalSlug;
  eyebrow: string;
  title: string;
  /** One line under the title. Also written into the meta description. */
  tagline: string;
  /** Shown as "Last updated …" when the page is a dated document. */
  updated?: string;
  children: ReactNode;
}

/**
 * The frame every legal URL shares: identity bar, title block, a way back to
 * the home page at both ends, and cross-links to the sibling pages.
 *
 * Deliberately plainer than the rest of the site — these are pages people are
 * meant to actually read, and that platform reviewers open cold.
 */
export default function LegalShell({ slug, eyebrow, title, tagline, updated, children }: Props) {
  const reduce = useReducedMotion();
  const siblings = legalPages.filter((page) => page.slug !== slug);

  // A client-side route change does not reset the scroll position or retitle
  // the tab the way a real navigation would, so do both here.
  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = `${title} | ${site.workName}`;

    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute('content') ?? null;
    meta?.setAttribute('content', tagline);

    return () => {
      document.title = previousTitle;
      if (previousDescription !== null) meta?.setAttribute('content', previousDescription);
    };
  }, [title, tagline]);

  return (
    /* The glass panel and bullets read `--cat`; these pages are not projects,
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
            <span className="mono-tag">{eyebrow}</span>
            <h1 className="section-title mt-3">{title}</h1>
            <p className="mt-4 max-w-[60ch] text-[0.95rem] leading-[1.7] text-[var(--muted)]">
              {tagline}
            </p>
            {updated && (
              <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--faint)]">
                Last updated {updated}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            {children}
          </motion.div>

          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <a {...routeLink('/')} className="primary-button">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </a>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {siblings.map((page) => (
                <a
                  key={page.slug}
                  {...routeLink(`/${page.slug}`)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                >
                  {page.title} <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </div>
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
