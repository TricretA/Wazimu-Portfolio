import { ArrowRight } from 'lucide-react';
import { services } from '../data/services';
import { site } from '../data/site';
import { pathFor, routeLink } from '../lib/route';
import PageShell from './PageShell';

/**
 * The six capabilities, automation and applied AI first.
 *
 * Order is the positioning: a specialism stated first and evidenced is what an
 * answer engine can repeat back. A six-way tie is what it has to summarise as
 * "a developer", which is the same answer as everyone else's.
 */
export default function ServiceIndexPage() {
  return (
    <PageShell
      width="wide"
      crumbs={[{ label: 'Home', path: pathFor.home() }, { label: 'Services' }]}
      eyebrow="Capabilities"
      title="What I build — and what it fixes"
      lede={`I lead with ${site.specialism}. The rest is what those systems usually need around them: web platforms, mobile apps, design and video. Scope decides price, so there are no numbers here — tell me what is broken and you get a fixed figure in writing.`}
    >
      <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <li key={service.slug}>
              <a
                {...routeLink(pathFor.service(service.slug))}
                className="glass-card flex h-full flex-col p-6 text-left transition-transform hover:-translate-y-1 sm:p-7"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-[var(--amber)]" strokeWidth={1.8} aria-hidden="true" />
                  <span className="text-[1.08rem] font-semibold tracking-tight">
                    {service.title}
                  </span>
                  {index < 2 && (
                    <span className="ml-auto rounded-full border border-[var(--line)] px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[var(--amber)]">
                      Specialism
                    </span>
                  )}
                </span>

                <span className="mt-3 block text-[0.88rem] leading-relaxed text-[var(--muted)]">
                  {service.lede}
                </span>

                <span className="mt-5 flex flex-wrap gap-1.5">
                  {service.solves.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--line-soft)] px-2.5 py-1 text-[0.72rem] text-[var(--faint)]"
                    >
                      {item}
                    </span>
                  ))}
                </span>

                <span className="mono-tag mt-auto inline-flex items-center gap-1.5 pt-6">
                  Read more <ArrowRight className="h-3 w-3" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}
