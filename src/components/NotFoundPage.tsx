import { problemCount } from '../data/problems';
import { pathFor, routeLink } from '../lib/route';
import PageShell from './PageShell';

/**
 * A real dead end.
 *
 * Until now every unmatched path returned the home page with a 200, which
 * turns each typo, stale link and scraper probe into another duplicate of the
 * homepage in the index. This page plus a `404.html` fallback makes a missing
 * URL say so.
 */
export default function NotFoundPage() {
  const destinations = [
    { label: `All ${problemCount} case studies`, path: pathFor.workIndex() },
    { label: 'Services', path: pathFor.serviceIndex() },
    { label: 'Insights', path: pathFor.insightIndex() },
    { label: 'About', path: pathFor.about() },
    { label: 'Contact', path: pathFor.contact() }
  ];

  return (
    <PageShell
      crumbs={[{ label: 'Home', path: pathFor.home() }, { label: 'Not found' }]}
      eyebrow="404"
      title="That page does not exist"
      lede="The link is either mistyped or points at something that has moved. Everything on the site is one click from here."
    >
      <ul className="m-0 list-none space-y-2 p-0">
        {destinations.map((item) => (
          <li key={item.path}>
            <a
              {...routeLink(item.path)}
              className="glass-card block p-4 text-[0.92rem] font-medium transition-transform hover:-translate-y-0.5"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
