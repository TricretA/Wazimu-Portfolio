import { insightsByDate } from '../data/insights';
import { pathFor, routeLink } from '../lib/route';
import PageShell from './PageShell';
import { formatDate } from './InsightPage';

/** The writing, newest first, each at a real URL. */
export default function InsightIndexPage() {
  return (
    <PageShell
      crumbs={[{ label: 'Home', path: pathFor.home() }, { label: 'Insights' }]}
      eyebrow="Writing"
      title="Things worth saying out loud"
      lede="Plain-spoken pieces on automation, applied AI, and why most business software quietly fails to do the job it was bought for."
    >
      <ul className="m-0 list-none space-y-4 p-0">
        {insightsByDate.map((post) => (
          <li key={post.slug}>
            <a
              {...routeLink(pathFor.insight(post.slug))}
              className="glass-card flex flex-col p-6 text-left transition-transform hover:-translate-y-1 sm:p-7"
            >
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--faint)]">
                <time dateTime={post.published}>{formatDate(post.published)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.minutes} minute read</span>
              </span>
              <h2 className="mt-3 text-[1.15rem] font-semibold leading-snug tracking-tight">
                {post.title}
              </h2>
              <p className="mt-2 m-0 text-[0.88rem] leading-relaxed text-[var(--muted)]">
                {post.dek}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
