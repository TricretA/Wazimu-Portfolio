import type { SolvedProblem } from '../data/problems';

interface Props {
  problem: SolvedProblem;
  /** Modal header treatment — shorter, so the case study stays above the fold. */
  banner?: boolean;
}

/**
 * Card artwork. Projects with a live URL carry a captured screenshot; the
 * private mobile apps fall back to a generated tile until the client-approved
 * screenshots land in /public/work.
 */
export default function WorkShot({ problem, banner = false }: Props) {
  if (problem.image) {
    return (
      <img
        src={problem.image}
        /*
         * "<title> screenshot" describes the file, not the picture. Naming
         * what the thing actually is gives a screen reader something useful
         * and gives image search a reason to surface it.
         */
        alt={`${problem.title} — ${problem.summary}`}
        loading={banner ? 'eager' : 'lazy'}
        decoding="async"
        /* Intrinsic 16:10, so the browser reserves the space before the
           image arrives instead of shifting everything below it. */
        width={1280}
        height={800}
        className={`work-shot${banner ? ' work-shot--banner' : ''}`}
      />
    );
  }

  const mark = problem.title
    .split(/\s+/)
    .slice(0, 3)
    .map((word) => word.replace(/[^A-Za-z0-9]/g, '').charAt(0))
    .join('')
    .toUpperCase();

  return (
    <div
      className={`work-placeholder${banner ? ' work-placeholder--banner' : ''}`}
      role="img"
      aria-label={problem.title}
    >
      <span className="font-mono text-3xl font-semibold tracking-[0.18em] text-[var(--soft)] opacity-70">
        {mark}
      </span>
    </div>
  );
}
