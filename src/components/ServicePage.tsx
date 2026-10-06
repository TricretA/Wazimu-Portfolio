import { ArrowRight, Check } from 'lucide-react';
import { services, type Service } from '../data/services';
import { solvedProblems } from '../data/problems';
import { site } from '../data/site';
import { pathFor, routeLink } from '../lib/route';
import { emphasise } from '../lib/emphasise';
import PageShell from './PageShell';

interface Props {
  service: Service;
}

/**
 * Which case-study category evidences which service.
 *
 * A claim with three linked builds under it reads differently — to a person
 * and to anything summarising the page — than the same claim on its own.
 */
const EVIDENCE: Record<string, string> = {
  'intelligent-automation': 'Automation',
  'applied-ai': 'Automation',
  'web-development': 'Websites',
  'software-development': 'Mobile Apps',
  'visual-design': 'Design',
  'video-production': 'Video Editing'
};

export default function ServicePage({ service }: Props) {
  const Icon = service.icon;
  const paragraphs = service.detail.split('\n\n').filter(Boolean);

  const category = EVIDENCE[service.slug];
  const proof = solvedProblems.filter((p) => p.category === category).slice(0, 3);
  const others = services.filter((entry) => entry.slug !== service.slug);

  return (
    <PageShell
      crumbs={[
        { label: 'Home', path: pathFor.home() },
        { label: 'Services', path: pathFor.serviceIndex() },
        { label: service.title }
      ]}
      meta={
        <span className="inline-flex items-center gap-2 text-[var(--muted)]">
          <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          <span className="mono-tag !mt-0">Service</span>
        </span>
      }
      title={`${service.title} in ${site.location.country}`}
      lede={service.lede}
    >
      <div className="space-y-5 text-[0.95rem] leading-[1.8] text-[var(--soft)]">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{emphasise(paragraph).nodes}</p>
        ))}
      </div>

      <section className="mt-12" aria-label="What this fixes">
        <h2 className="mono-tag">What this fixes</h2>
        <ul className="mt-4 m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-3">
          {service.solves.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-xl border border-[var(--line-soft)] bg-white/[0.03] p-4 text-[0.85rem] text-[var(--soft)]"
            >
              <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--amber)]" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {proof.length > 0 && (
        <section className="mt-12" aria-label="Work that proves it">
          <h2 className="mono-tag">Work that proves it</h2>
          <ul className="mt-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3">
            {proof.map((project) => (
              <li key={project.slug} data-category={project.category}>
                <a
                  {...routeLink(pathFor.work(project.slug))}
                  className="glass-card flex h-full flex-col p-5 text-left transition-transform hover:-translate-y-1"
                >
                  <span className="text-[0.92rem] font-semibold leading-snug tracking-tight">
                    {project.title}
                  </span>
                  <span className="clamp-3 mt-2 text-[0.8rem] leading-relaxed text-[var(--muted)]">
                    {project.summary}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            {...routeLink(pathFor.workIndex())}
            className="mono-tag mt-5 inline-flex items-center gap-1.5 transition-colors hover:!text-[var(--text)]"
          >
            See all case studies <ArrowRight className="h-3 w-3" />
          </a>
        </section>
      )}

      <section className="mt-12" aria-label="Tools and platforms">
        <h2 className="mono-tag">Tools and platforms</h2>
        <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
          {service.stack.map((item) => (
            <li
              key={item.name}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line-soft)] bg-white/[0.04] px-3 py-1.5 text-[0.78rem] text-[var(--soft)]"
            >
              <img
                src={item.icon}
                alt=""
                aria-hidden="true"
                width={14}
                height={14}
                loading="lazy"
                className={item.wide ? 'h-3.5 w-auto' : 'h-3.5 w-3.5'}
              />
              {item.name}
            </li>
          ))}
        </ul>
      </section>

      {/* Answered in plain HTML on the page, and emitted as FAQPage schema by
          the prerenderer — the same words in both places, never two versions. */}
      <section className="mt-14" aria-label="Common questions">
        <h2 className="section-title !text-[1.35rem]">Common questions</h2>
        <dl className="mt-6 m-0 space-y-5">
          {service.faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-xl border border-[var(--line-soft)] bg-white/[0.03] p-5 sm:p-6"
            >
              <dt className="m-0 text-[0.98rem] font-semibold leading-snug tracking-tight">
                {faq.question}
              </dt>
              <dd className="m-0 mt-2.5 text-[0.88rem] leading-[1.75] text-[var(--muted)]">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14 border-t border-[var(--line-soft)] pt-8">
        <h2 className="mono-tag">Other things I build</h2>
        <ul className="mt-4 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-[0.85rem] text-[var(--muted)]">
          {others.map((entry) => (
            <li key={entry.slug}>
              <a
                {...routeLink(pathFor.service(entry.slug))}
                className="transition-colors hover:text-[var(--text)]"
              >
                {entry.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
