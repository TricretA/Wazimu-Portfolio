import { ArrowUpRight, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { solvedProblems, type SolvedProblem } from '../data/problems';
import { testimonials, displayName, displayMeta } from '../data/testimonials';
import { site } from '../data/site';
import { pathFor, routeLink } from '../lib/route';
import PageShell from './PageShell';
import WorkShot from './WorkShot';
import CategoryBadge from './CategoryBadge';

interface Props {
  problem: SolvedProblem;
}

/**
 * A case study at its own URL.
 *
 * The same content the modal shows, laid out as a page, because this is what a
 * crawler fetches and what a shared link resolves to. The modal stays the way
 * the index is browsed; this is the artefact.
 *
 * It carries more than the modal does — the client's own words where there are
 * any, and links to neighbouring work — since a person who arrived here from a
 * search result has no index above them to fall back to.
 */
export default function WorkPage({ problem }: Props) {
  const quotes = testimonials.filter((quote) => quote.projectSlug === problem.slug);

  const index = solvedProblems.findIndex((entry) => entry.slug === problem.slug);
  const previous = index > 0 ? solvedProblems[index - 1] : null;
  const next = index < solvedProblems.length - 1 ? solvedProblems[index + 1] : null;

  // Same-category work is the useful onward link, and it gives a crawler a
  // path between related pages rather than only back up to the index.
  const related = solvedProblems
    .filter((entry) => entry.category === problem.category && entry.slug !== problem.slug)
    .slice(0, 3);

  return (
    <div data-category={problem.category} style={{ display: 'contents' } as CSSProperties}>
      <PageShell
        crumbs={[
          { label: 'Home', path: pathFor.home() },
          { label: 'Work', path: pathFor.workIndex() },
          { label: problem.title }
        ]}
        meta={<CategoryBadge category={problem.category} className="mb-1" />}
        title={problem.title}
        lede={problem.summary}
        banner={<WorkShot problem={problem} banner />}
      >
        <div className="space-y-3">
          <div className="register register--problem">
            <div className="register-head">The problem</div>
            <p className="register-body">{problem.problem}</p>
          </div>

          <div className="register register--solution">
            <div className="register-head">What I built</div>
            <p className="register-body">{problem.solution}</p>
          </div>

          <div className="register register--outcome">
            <div className="register-head">The outcome</div>
            <p className="register-body">{problem.outcome}</p>
          </div>
        </div>

        {quotes.length > 0 && (
          <section className="mt-12" aria-label="What the client said">
            <h2 className="mono-tag">What the client said</h2>
            <div className="mt-4 space-y-4">
              {quotes.map((quote) => (
                <figure
                  key={quote.business}
                  className="glass-card m-0 p-6 text-left sm:p-7"
                >
                  <blockquote className="m-0 text-[0.95rem] leading-[1.75] text-[var(--soft)]">
                    “{quote.quote}”
                  </blockquote>
                  <figcaption className="mt-4 text-[0.82rem] text-[var(--muted)]">
                    <span className="font-semibold text-[var(--text)]">
                      {displayName(quote)}
                    </span>
                    <span className="mx-1.5 text-[var(--faint)]">·</span>
                    {displayMeta(quote)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-[var(--line-soft)] pt-8">
          {problem.link ? (
            <a
              href={problem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button"
            >
              {problem.linkText ?? 'View live'} <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : (
            /* Running, but the client keeps it off the open web. A dead chip is
               a dead end, so the status doubles as the way to ask for a look. */
            <a
              href={site.privateAccess}
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button"
            >
              <Lock className="h-3.5 w-3.5" /> Private deployment · request access
            </a>
          )}

          {problem.repo === 'public' && problem.repoUrl && (
            <a
              href={problem.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button"
            >
              View source <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}

          {problem.repo === 'private' && problem.category !== 'Design' && (
            <p className="m-0 max-w-[52ch] text-xs leading-relaxed text-[var(--faint)]">
              Source is private — the owner does not permit public access to this
              codebase. A walkthrough is available on request.
            </p>
          )}
        </div>

        {related.length > 0 && (
          <section className="mt-14" aria-label={`More ${problem.category} work`}>
            <h2 className="mono-tag">More {problem.category.toLowerCase()} work</h2>
            <ul className="mt-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3">
              {related.map((entry) => (
                <li key={entry.slug}>
                  <a
                    {...routeLink(pathFor.work(entry.slug))}
                    className="glass-card group flex h-full flex-col p-5 text-left transition-transform hover:-translate-y-1"
                  >
                    <span className="text-[0.92rem] font-semibold leading-snug tracking-tight">
                      {entry.title}
                    </span>
                    <span className="clamp-3 mt-2 text-[0.8rem] leading-relaxed text-[var(--muted)]">
                      {entry.summary}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav
          aria-label="Case study navigation"
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line-soft)] pt-7"
        >
          {previous ? (
            <a
              {...routeLink(pathFor.work(previous.slug))}
              className="inline-flex max-w-[45%] items-center gap-2 text-[0.82rem] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
            >
              <ArrowLeft className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{previous.title}</span>
            </a>
          ) : (
            <span />
          )}
          {next && (
            <a
              {...routeLink(pathFor.work(next.slug))}
              className="inline-flex max-w-[45%] items-center gap-2 text-[0.82rem] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
            >
              <span className="truncate">{next.title}</span>
              <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
            </a>
          )}
        </nav>
      </PageShell>
    </div>
  );
}
