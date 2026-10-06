import { useEffect, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { site } from '../data/site';
import { pathFor, routeLink } from '../lib/route';
import SiteFooter from './SiteFooter';

export interface Crumb {
  label: string;
  path?: string;
}

interface Props {
  /** Rendered as the page's only `<h1>`. */
  title: string;
  /** Kicker above the title. */
  eyebrow?: string;
  /**
   * The opening line, set larger than the body.
   *
   * Answer engines lift a page's first sentences to decide whether it answers
   * the query — a little over 40% of citations come from the intro — so every
   * page states its answer here before any framing.
   */
  lede?: ReactNode;
  crumbs: Crumb[];
  /** Sits between the header and the title block: a badge, a date, a category. */
  meta?: ReactNode;
  /** Full-bleed artwork under the title block. */
  banner?: ReactNode;
  /** Constrains the body column. Prose reads badly past ~70 characters. */
  width?: 'prose' | 'wide';
  children: ReactNode;
}

/**
 * The frame every standalone page shares.
 *
 * The home page is one long scroll with modals over it; these are the same
 * content at its own URL, for the crawler that will never run the JavaScript
 * and the person who was sent a link. The header carries real links to every
 * section rather than the home page's in-page anchors, which do nothing from
 * here and — more to the point — give a crawler sixty-six pages that all
 * reference each other instead of sixty-six orphans.
 */
export default function PageShell({
  title,
  eyebrow,
  lede,
  crumbs,
  meta,
  banner,
  width = 'prose',
  children
}: Props) {
  const reduce = useReducedMotion();

  // A soft navigation does not reset scroll the way a real one does.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  const nav = [
    { label: 'Work', path: pathFor.workIndex() },
    { label: 'Services', path: pathFor.serviceIndex() },
    { label: 'Insights', path: pathFor.insightIndex() },
    { label: 'About', path: pathFor.about() },
    { label: 'Contact', path: pathFor.contact() }
  ];

  return (
    <div className="page-shell">
      <div className="aurora-layer" aria-hidden="true" />

      <header className="relative z-[2] border-b border-[var(--line-soft)]">
        <div className="shell-width flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
          <a
            {...routeLink(pathFor.home())}
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

          <nav aria-label="Sections">
            <ul className="m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-2 p-0 text-[0.8rem] font-medium text-[var(--muted)]">
              {nav.map((item) => (
                <li key={item.path}>
                  <a
                    {...routeLink(item.path)}
                    className="transition-colors hover:text-[var(--text)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="page-content">
        <div
          className={`shell-width pb-20 pt-10 sm:pb-28 sm:pt-14 ${
            width === 'prose' ? 'max-w-[820px]' : ''
          }`}
        >
          {/* A visible trail, not just schema: it is the only way back up the
              hierarchy on a page someone landed on cold from a search result. */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--faint)]">
              {crumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {index > 0 && <ChevronRight className="h-3 w-3 opacity-50" aria-hidden="true" />}
                  {crumb.path ? (
                    <a
                      {...routeLink(crumb.path)}
                      className="transition-colors hover:text-[var(--text)]"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span aria-current="page" className="text-[var(--muted)]">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/*
            Entry reveals slide, they do not fade.

            Every page is prerendered, so whatever `initial` sets is what sits
            in the static HTML a crawler reads — and `opacity: 0` there means
            the text is present but hidden, which is the one state you never
            want a search engine to find content in. Translating only keeps
            the motion and leaves every word fully opaque from the first byte.
            Modals are exempt: they exist only after hydration, so nothing
            machine-readable depends on them.
          */}
          <motion.div
            initial={{ y: reduce ? 0 : 18 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {eyebrow && <span className="mono-tag">{eyebrow}</span>}
            {meta}
            <h1 className="section-title mt-3">{title}</h1>
            {lede && (
              <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-[1.7] text-[var(--soft)]">
                {lede}
              </p>
            )}
          </motion.div>

          {banner && (
            <motion.div
              initial={{ y: reduce ? 0 : 18 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 overflow-hidden rounded-2xl border border-[var(--line-soft)]"
            >
              {banner}
            </motion.div>
          )}

          <motion.div
            initial={{ y: reduce ? 0 : 18 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12"
          >
            {children}
          </motion.div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
