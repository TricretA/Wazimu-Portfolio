import { ArrowRight } from 'lucide-react';
import { insights, type Insight } from '../data/insights';
import { site } from '../data/site';
import { pathFor, routeLink } from '../lib/route';
import { emphasise } from '../lib/emphasise';
import PageShell from './PageShell';

interface Props {
  post: Insight;
}

/** "2026-08-08" → "8 August 2026". */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

/**
 * An article at its own URL.
 *
 * These were the only long-form prose on the site and they were locked inside
 * a modal keyed by a numeric id — unlinkable, unshareable, and invisible to
 * every crawler. The slugs were already sitting in the data file unused.
 *
 * The visible date is not decoration: an undated article cannot be ranked on
 * recency, and recency is one of the few levers that reliably moves retrieval-
 * based answer engines.
 */
export default function InsightPage({ post }: Props) {
  const paragraphs = post.body.split('\n\n').filter(Boolean);
  const others = insights.filter((entry) => entry.slug !== post.slug);
  const modified = post.updated ?? post.published;

  return (
    <PageShell
      crumbs={[
        { label: 'Home', path: pathFor.home() },
        { label: 'Insights', path: pathFor.insightIndex() },
        { label: post.title }
      ]}
      eyebrow={`${post.minutes} minute read`}
      title={post.title}
      lede={post.dek}
    >
      <article>
        <p className="m-0 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--faint)]">
          <span>Published </span>
          <time dateTime={post.published}>{formatDate(post.published)}</time>
          {post.updated && post.updated !== post.published && (
            <>
              <span> · Updated </span>
              <time dateTime={post.updated}>{formatDate(post.updated)}</time>
            </>
          )}
        </p>

        <div className="mt-8 space-y-5 text-[0.95rem] leading-[1.8] text-[var(--soft)]">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{emphasise(paragraph).nodes}</p>
          ))}
        </div>

        <footer className="mt-12 border-t border-[var(--line-soft)] pt-7">
          <p className="m-0 text-[0.85rem] leading-relaxed text-[var(--muted)]">
            Written by{' '}
            <a
              {...routeLink(pathFor.about())}
              className="font-semibold text-[var(--text)] underline decoration-[var(--line)] underline-offset-4 transition-colors hover:decoration-[var(--text)]"
            >
              {site.name}
            </a>
            {' — '}
            {site.jobTitle.toLowerCase()} in {site.location.country}, building{' '}
            {site.specialism}.
          </p>
          <a {...routeLink(pathFor.contact())} className="primary-button mt-6">
            Talk about your bottleneck <ArrowRight className="h-4 w-4" />
          </a>
        </footer>
      </article>

      {others.length > 0 && (
        <section className="mt-14" aria-label="More writing">
          <h2 className="mono-tag">More writing</h2>
          <ul className="mt-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
            {others.map((entry) => (
              <li key={entry.slug}>
                <a
                  {...routeLink(pathFor.insight(entry.slug))}
                  className="glass-card flex h-full flex-col p-5 text-left transition-transform hover:-translate-y-1"
                >
                  <span className="text-[0.95rem] font-semibold leading-snug tracking-tight">
                    {entry.title}
                  </span>
                  <span className="mt-2 text-[0.82rem] leading-relaxed text-[var(--muted)]">
                    {entry.dek}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  );
}
