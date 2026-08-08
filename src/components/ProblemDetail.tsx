import { motion } from 'motion/react';
import { X, ArrowUpRight, Lock } from 'lucide-react';
import type { SolvedProblem } from '../data/problems';
import { site } from '../data/site';
import { useModalBehaviour } from '../hooks/useModalBehaviour';
import WorkShot from './WorkShot';
import CategoryBadge from './CategoryBadge';
import Portal from './Portal';

interface Props {
  problem: SolvedProblem;
  onClose: () => void;
}

export default function ProblemDetail({ problem, onClose }: Props) {
  useModalBehaviour(true, onClose);

  return (
    <Portal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={problem.title}
          initial={{ scale: 0.96, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(event) => event.stopPropagation()}
          data-category={problem.category}
          className="glass-panel custom-scrollbar relative max-h-[88vh] w-full max-w-2xl overflow-y-auto text-center"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-[2] rounded-full border border-[var(--line-soft)] bg-black/50 p-2 text-[var(--soft)] backdrop-blur-md transition-colors hover:bg-black/70 hover:text-[var(--text)]"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="overflow-hidden border-b border-[var(--line-soft)]">
            <WorkShot problem={problem} banner />
          </div>

          <div className="p-6 sm:p-9">
            <CategoryBadge category={problem.category} className="mb-4" />
            <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              {problem.title}
            </h2>
            <p className="section-copy !mt-3 !text-[0.9rem]">{problem.summary}</p>

            <div className="mt-8 space-y-3 text-left">
              <div className="register register--problem">
                <div className="register-head justify-center">The problem</div>
                <p className="register-body text-center">{problem.problem}</p>
              </div>

              <div className="register register--solution">
                <div className="register-head justify-center">What I built</div>
                <p className="register-body text-center">{problem.solution}</p>
              </div>

              <div className="register register--outcome">
                <div className="register-head justify-center">The outcome</div>
                <p className="register-body text-center">{problem.outcome}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 border-t border-[var(--line-soft)] pt-7">
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
                // Running, but the client keeps it off the open web. A dead
                // chip is a dead end, so the status doubles as the way to ask
                // for a walkthrough.
                <a
                  href={site.privateAccess}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-button"
                >
                  <Lock className="h-3.5 w-3.5" /> Private deployment · request access
                </a>
              )}

              {problem.repo === 'private' && problem.category !== 'Design' && (
                <p className="m-0 max-w-[52ch] text-xs leading-relaxed text-[var(--faint)]">
                  Source is private — the owner does not permit public access to this
                  codebase. A walkthrough is available on request.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Portal>
  );
}
