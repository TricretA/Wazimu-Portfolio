import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { insights, type Insight } from '../data/insights';
import { useModalBehaviour } from '../hooks/useModalBehaviour';
import { emphasise } from '../lib/emphasise';
import Portal from './Portal';

const readTime = (minutes: number) =>
  `${minutes} minute${minutes === 1 ? '' : 's'} read`;

function InsightModal({ post, onClose }: { post: Insight; onClose: () => void }) {
  useModalBehaviour(true, onClose);
  const paragraphs = post.body.split('\n\n').filter(Boolean);

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
        <motion.article
          role="dialog"
          aria-modal="true"
          aria-label={post.title}
          initial={{ scale: 0.96, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(event) => event.stopPropagation()}
          className="glass-panel custom-scrollbar relative max-h-[86vh] w-full max-w-2xl overflow-y-auto p-6 text-center sm:p-10"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full border border-[var(--line-soft)] p-2 text-[var(--muted)] transition-colors hover:bg-white/8 hover:text-[var(--text)]"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mb-8 px-4 pt-6 sm:pt-0">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              {post.title}
            </h2>
            <div className="mono-tag mt-4">{readTime(post.minutes)}</div>
          </div>

          <div className="mx-auto max-w-[62ch] space-y-5 text-left text-[0.92rem] leading-[1.75] text-[var(--soft)]">
            {/* No `m-0` here — it would cancel the `space-y-5` gap between paragraphs. */}
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{emphasise(paragraph).nodes}</p>
            ))}
          </div>
        </motion.article>
      </motion.div>
    </Portal>
  );
}

export default function Insights() {
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState<number | null>(null);
  const selected = insights.find((post) => post.id === openId) ?? null;

  return (
    <section id="insights" className="section-band section-divider relative">
      <div className="shell-width">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-head"
        >
          <h2 className="section-title">Things worth saying out loud</h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {insights.map((post, index) => (
            <motion.button
              key={post.id}
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                delay: reduce ? 0 : index * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              onClick={() => setOpenId(post.id)}
              className="glass-card group flex h-full flex-col items-center p-6 text-center hover:-translate-y-1"
            >
              <span className="mono-tag mb-4">{readTime(post.minutes)}</span>

              <h3 className="text-[1.05rem] font-semibold leading-snug tracking-tight">
                {post.title}
              </h3>

              <p className="mt-3 text-[0.84rem] leading-relaxed text-[var(--muted)]">
                {post.dek}
              </p>

              <span className="mono-tag mt-auto inline-flex items-center gap-1.5 pt-6 transition-colors group-hover:!text-[var(--text)]">
                Take a look <ArrowRight className="h-3 w-3" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <InsightModal post={selected} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </section>
  );
}
