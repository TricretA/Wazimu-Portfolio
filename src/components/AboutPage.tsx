import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { site, aboutParagraphs, aboutFacts, knowsAbout } from '../data/site';
import { problemCount, liveSystemCount } from '../data/problems';
import { pathFor, routeLink } from '../lib/route';
import { emphasise } from '../lib/emphasise';
import PageShell from './PageShell';

/**
 * The About story at a real URL.
 *
 * It existed only as a modal, which meant the one page on the site that says
 * plainly who this person is and what they specialise in could not be linked,
 * cited, or read by anything that does not run JavaScript. It is the page a
 * "who is Reinhard Bonke?" query should resolve to, so it carries the same
 * facts the Person schema does, in prose.
 */
export default function AboutPage() {
  return (
    <PageShell
      crumbs={[{ label: 'Home', path: pathFor.home() }, { label: 'About' }]}
      eyebrow="About"
      title={`${site.name} — ${site.jobTitle}`}
      lede={`Known professionally as ${site.workName}. I build ${site.specialism} for businesses in ${site.location.country} and across ${site.location.region}, and remotely worldwide.`}
    >
      <dl className="m-0 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {aboutFacts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-xl border border-[var(--line-soft)] bg-white/[0.03] p-4 text-center"
          >
            <dt className="sr-only">{fact.label}</dt>
            <dd className="m-0">
              <span className="block text-[1.5rem] font-semibold tracking-tight text-[var(--text)]">
                {fact.value}
              </span>
              <span className="mt-1 block text-[0.72rem] leading-snug text-[var(--faint)]">
                {fact.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 space-y-5 text-[0.95rem] leading-[1.8] text-[var(--soft)]">
        {aboutParagraphs.map((paragraph, index) => (
          <p key={index}>{emphasise(paragraph).nodes}</p>
        ))}
      </div>

      <section className="mt-12" aria-label="What I work with">
        <h2 className="mono-tag">What I work with</h2>
        <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
          {knowsAbout.map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-[var(--line-soft)] bg-white/[0.04] px-3 py-1.5 text-[0.78rem] text-[var(--soft)]"
            >
              {topic}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-label="The record">
        <h2 className="mono-tag">The record</h2>
        <p className="mt-4 text-[0.92rem] leading-[1.8] text-[var(--soft)]">
          There are{' '}
          <a
            {...routeLink(pathFor.workIndex())}
            className="font-semibold text-[var(--text)] underline decoration-[var(--line)] underline-offset-4 transition-colors hover:decoration-[var(--text)]"
          >
            {problemCount} documented case studies
          </a>{' '}
          on this site. Each one names the business problem, the system built to remove
          it, and what changed afterwards. {liveSystemCount} have a live URL you can open
          and check. The rest are running but kept off the open web by the client, and a
          walkthrough is available on request.
        </p>
      </section>

      <section className="mt-12" aria-label="Elsewhere">
        <h2 className="mono-tag">Elsewhere</h2>
        <ul className="mt-4 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-[0.85rem] text-[var(--muted)]">
          {[
            { label: 'LinkedIn', href: site.socials.linkedin },
            { label: 'GitHub', href: site.socials.github },
            { label: 'X', href: site.socials.x },
            { label: 'Instagram', href: site.socials.instagram },
            { label: 'CV', href: site.cvUrl }
          ].map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer me"
                className="inline-flex items-center gap-1 transition-colors hover:text-[var(--text)]"
              >
                {link.label} <ArrowUpRight className="h-3 w-3" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <a {...routeLink(pathFor.contact())} className="primary-button mt-12">
        Start a project <ArrowRight className="h-4 w-4" />
      </a>
    </PageShell>
  );
}
