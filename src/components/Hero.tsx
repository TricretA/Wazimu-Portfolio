import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { site } from '../data/site';

export default function Hero() {
  const reduce = useReducedMotion();
  const rafRef = useRef(0);

  // Drive the aurora light source from scroll position.
  useEffect(() => {
    if (reduce) return;
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const shift = Math.min(window.scrollY * 0.12, 260);
        document.documentElement.style.setProperty('--aurora-shift', `${-shift}px`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduce]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const }
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24"
    >
      <div className="shell-width relative z-[1] text-center">
        <motion.div {...rise(0)} className="flex justify-center">
          <span className="micro-label">
            <img src="/avatars/tricreta.webp" alt="" aria-hidden="true" loading="eager" />
            {site.name}
            <span className="text-[var(--faint)]">/</span>
            <span className="text-[var(--muted)]">{site.workName}</span>
          </span>
        </motion.div>

        <motion.h2 {...rise(0.08)} className="display-title mt-7">
          I build systems that
          <br className="hidden sm:block" /> quietly make businesses{' '}
          <span className="italic font-normal text-[var(--amber)]">work</span>.
        </motion.h2>

        <motion.p {...rise(0.16)} className="section-copy mt-6 !max-w-[54ch]">
          I design digital products that convert visitors, automate operations, and
          eliminate the things slowing your business down.
        </motion.p>

        <motion.div
          {...rise(0.24)}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href="#index" className="primary-button breathe w-full sm:w-auto">
            See the proof <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-button w-full sm:w-auto"
          >
            Let&apos;s talk <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      <span className="ghost-word" aria-hidden="true">
        SYSTEMS
      </span>
    </section>
  );
}
