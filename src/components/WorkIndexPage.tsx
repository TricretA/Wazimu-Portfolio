import { solvedProblems, categories, problemCount, liveSystemCount } from '../data/problems';
import { pathFor, routeLink } from '../lib/route';
import PageShell from './PageShell';
import WorkShot from './WorkShot';
import CategoryBadge from './CategoryBadge';

/**
 * Every case study as one crawlable list.
 *
 * The home page's index is a filtered, paginated, JavaScript-driven grid —
 * good for a person, useless to a crawler that renders nine cards and stops.
 * This page links all forty-eight with their summaries, in flat HTML, which is
 * what turns a pile of orphan pages into a set something can actually walk.
 */
export default function WorkIndexPage() {
  const byCategory = categories
    .filter((category) => category !== 'All')
    .map((category) => ({
      category,
      entries: solvedProblems.filter((project) => project.category === category)
    }))
    .filter((group) => group.entries.length > 0);

  return (
    <PageShell
      width="wide"
      crumbs={[{ label: 'Home', path: pathFor.home() }, { label: 'Work' }]}
      eyebrow="Case studies"
      title={`${problemCount} solved business problems`}
      lede={`Every entry is a real business problem, the system built to remove it, and what changed afterwards. ${liveSystemCount} of them have a live URL you can open right now.`}
    >
      {byCategory.map((group) => (
        <section key={group.category} className="mb-16 last:mb-0">
          <div className="flex items-baseline gap-3 border-b border-[var(--line-soft)] pb-3">
            <h2 className="m-0 text-[1.15rem] font-semibold tracking-tight">
              {group.category}
            </h2>
            <span className="font-mono text-[0.7rem] text-[var(--faint)]">
              {group.entries.length}
            </span>
          </div>

          <ul className="mt-6 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
            {group.entries.map((project) => (
              <li key={project.slug} data-category={project.category}>
                <a
                  {...routeLink(pathFor.work(project.slug))}
                  className="glass-card group flex h-full flex-col overflow-hidden text-left transition-transform hover:-translate-y-1"
                >
                  <span className="block overflow-hidden border-b border-[var(--line-soft)]">
                    <WorkShot problem={project} />
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <CategoryBadge category={project.category} className="mb-3" />
                    <span className="text-[1rem] font-semibold leading-snug tracking-tight">
                      {project.title}
                    </span>
                    <span className="mt-2 text-[0.83rem] leading-relaxed text-[var(--muted)]">
                      {project.summary}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </PageShell>
  );
}
