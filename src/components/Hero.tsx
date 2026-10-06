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

/*
 * Entry reveals slide, they do not fade.
 *
 * Every page is prerendered, so whatever `initial` sets is what sits in the
 * static HTML that crawlers read — and an `opacity: 0` there means the text is
 * present but hidden, which is the one state you never want a search engine to
 * find content in. A translate-only reveal keeps the motion and leaves every
 * word fully opaque from the first byte. Modals are exempt: they only ever
 * exist after hydration, so nothing machine-readable depends on them.
 */
  const rise = (delay: number) => ({
    initial: { y: reduce ? 0 : 22 },
    animate: { y: 0 },
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

        {/*
          The page's only h1, and the site's only chance to say what this
          person does in words someone would actually search or ask for.

          "I build systems that quietly make businesses work" is the better
          line and it stays — as the sub-head. It is also, for retrieval
          purposes, four nouns none of which is a thing anyone looks for. The
          h1 carries the specialism and the geography; the line underneath
          carries the voice.
        */}
        <motion.h1 {...rise(0.08)} className="display-title mt-7">
          Automation &amp; AI systems for{' '}
          <span className="italic font-normal text-[var(--amber)]">African</span>{' '}
          businesses
        </motion.h1>

        <motion.p {...rise(0.14)} className="section-copy mt-5 !max-w-[56ch] !text-[1.05rem]">
          I build systems that quietly make businesses{' '}
          <span className="italic text-[var(--amber)]">work</span> — WhatsApp Business
          API automations, M-Pesa integrations, n8n workflows and AI agents that remove
          the manual steps slowing you down.
        </motion.p>

        <motion.p {...rise(0.2)} className="section-copy mt-4 !max-w-[54ch] !text-[0.88rem]">
          {site.name} · {site.jobTitle} · based in {site.location.country}, working
          remotely worldwide.
        </motion.p>

        <motion.div
          {...rise(0.28)}
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
