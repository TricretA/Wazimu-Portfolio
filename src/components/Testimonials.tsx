import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import {
  testimonials,
  displayName,
  displayMeta,
  initials,
  type Testimonial
} from '../data/testimonials';
import { findProblem } from '../data/problems';
import { requestOpenProblem } from '../lib/openProblem';

function Avatar({ item }: { item: Testimonial }) {
  if (item.photo) {
    return (
      <img
        src={item.photo}
        alt={displayName(item)}
        loading="lazy"
        className="h-16 w-16 rounded-full border border-[var(--line)] object-cover"
      />
    );
  }

  // No photo on file — a glyph if one fits the client, otherwise an initials
  // disc. Either keeps the row deliberate instead of leaving a hole.
  const Icon = item.icon;

  return (
    <span
      aria-hidden="true"
      className="grid h-16 w-16 place-items-center rounded-full border border-[var(--line)] bg-white/6 font-mono text-base font-semibold text-[var(--soft)]"
    >
      {Icon ? <Icon className="h-7 w-7 text-[var(--soft)]" /> : initials(item)}
    </span>
  );
}

function Card({ item }: { item: Testimonial }) {
  const project = findProblem(item.projectSlug);
  const meta = displayMeta(item);

  return (
    <figure className="glass-card flex w-[310px] flex-shrink-0 flex-col items-center p-7 text-center sm:w-[370px]">
      <Avatar item={item} />

      <div className="mt-4">
        <div className="text-[0.95rem] font-semibold tracking-tight">
          {displayName(item)}
        </div>
        {meta && (
          <div className="mt-1 text-[0.78rem] text-[var(--muted)]">{meta}</div>
        )}
      </div>

      <blockquote className="m-0 mt-5 text-[0.87rem] leading-relaxed text-[var(--soft)]">
        “{item.quote}”
      </blockquote>

      {project && (
        <button
          onClick={() => requestOpenProblem(project.slug)}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-[rgba(164,255,231,0.32)] bg-[rgba(164,255,231,0.1)] px-3.5 py-1.5 text-[0.74rem] font-semibold text-[var(--success)] transition-colors hover:bg-[rgba(164,255,231,0.18)]"
        >
          {project.title} <ArrowUpRight className="h-3 w-3" />
        </button>
      )}
    </figure>
  );
}

export default function Testimonials() {
  const reduce = useReducedMotion();
  // Duplicated once so the -50% keyframe loops seamlessly.
  const track = [...testimonials, ...testimonials];

  return (
    <section id="clients" className="section-band section-divider relative">
      <div className="shell-width">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-head"
        >
          <h2 className="section-title">What changed for them</h2>
        </motion.div>
      </div>

      <div className="marquee-viewport mt-14">
        <div className="marquee-track hue-cycle">
          {track.map((item, index) => (
            <Card key={`${item.projectSlug}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
