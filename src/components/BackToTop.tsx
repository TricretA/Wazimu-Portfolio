import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, y: reduce ? 0 : 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: reduce ? 0 : 16, scale: 0.9 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/8 text-[var(--soft)] shadow-[0_12px_34px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors hover:bg-white/14 hover:text-[var(--text)] sm:bottom-7 sm:right-7"
        >
          <ArrowUp className="h-[1.15rem] w-[1.15rem]" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
