import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { useModalBehaviour } from '../hooks/useModalBehaviour';
import { aboutParagraphs, aboutFacts } from '../data/site';
import { emphasise } from '../lib/emphasise';
import Portal from './Portal';

interface Props {
  onClose: () => void;
}

export default function AboutModal({ onClose }: Props) {
  useModalBehaviour(true, onClose);

  return (
    <Portal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="About"
          initial={{ scale: 0.96, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(event) => event.stopPropagation()}
          className="glass-panel custom-scrollbar relative max-h-[88vh] w-full max-w-xl overflow-y-auto p-6 text-center sm:p-9"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full border border-[var(--line-soft)] p-2 text-[var(--muted)] transition-colors hover:bg-white/8 hover:text-[var(--text)]"
          >
            <X className="h-4 w-4" />
          </button>

          <h2 className="pt-2 text-xl font-semibold tracking-tight">About me</h2>

          {/*
            Video sits in a rounded frame rather than a circle — the old circular
            crop clipped the native play button and the scrubber.
          */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--line-soft)] bg-black/40">
            <video
              src="/hello.mp4"
              className="aspect-video w-full object-cover"
              controls
              preload="metadata"
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="mx-auto mt-7 max-w-[60ch] space-y-4 text-left text-[0.89rem] leading-[1.75] text-[var(--soft)]">
            {/* No `m-0` here — it would cancel the `space-y-4` gap between paragraphs. */}
            {/*
              The hue cycle runs across the whole story rather than restarting
              per paragraph, so consecutive highlights never land on the same
              colour. `cursor` carries the count forward between paragraphs.
            */}
            {(() => {
              let cursor = 0;
              return aboutParagraphs.map((paragraph, index) => {
                const { nodes, used } = emphasise(paragraph, { cycle: true }, cursor);
                cursor += used;
                return <p key={index}>{nodes}</p>;
              });
            })()}
          </div>

          <div className="hue-cycle mt-8 grid grid-cols-2 gap-2.5 border-t border-[var(--line-soft)] pt-7 sm:grid-cols-4">
            {aboutFacts.map(({ value, label }) => (
              <div key={label} className="about-stat">
                <div className="about-stat__value">{value}</div>
                <div className="about-stat__label">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Portal>
  );
}
