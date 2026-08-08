import { motion, useReducedMotion } from 'motion/react';

const PROCESS = [
  {
    step: '01',
    title: 'Diagnose',
    desc: 'We uncover the root cause of the bottleneck, not just the symptoms.'
  },
  {
    step: '02',
    title: 'Design',
    desc: 'I map the architecture and the flow before a line of code exists.'
  },
  {
    step: '03',
    title: 'Build',
    desc: 'Platform, integrations, and automations, shipped as one system.'
  },
  {
    step: '04',
    title: 'Operate',
    desc: 'Tested, refined, and left running without me in the loop.'
  }
];

/** Seconds for one full sweep — must match the CSS animation duration. */
const CYCLE = 6;

export default function Method() {
  const reduce = useReducedMotion();

  return (
    <section id="method" className="section-band section-divider relative overflow-hidden">
      {/* Counterweight to the hero figure — same treatment, opposite edge. */}
      <img
        src="/portrait.webp"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="method-portrait"
      />

      <div className="shell-width relative z-[1]">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-head"
        >
          <h2 className="section-title">How the work runs</h2>
          <p className="section-copy">
            Four steps, every time. Nothing gets built before the problem is understood.
          </p>
        </motion.div>

        <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Rail spans the node centres, so the charge lands dead on each one. */}
          <div className="method-rail pointer-events-none hidden lg:block" aria-hidden="true">
            <span className="method-charge" />
          </div>

          {PROCESS.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: reduce ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                delay: reduce ? 0 : index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative flex flex-col items-center text-center"
            >
              {/*
                The charge travels 0→100% of the rail linearly, and node i sits
                at (i + 0.5)/4 of it. Delaying the spark by that fraction of the
                cycle makes it fire exactly as the charge arrives.
              */}
              <div
                className="method-node mb-5"
                style={{
                  animationDelay: `${(((index + 0.5) / PROCESS.length) * CYCLE).toFixed(2)}s`
                }}
              >
                {item.step}
              </div>
              <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 max-w-[28ch] text-[0.84rem] leading-relaxed text-[var(--muted)]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
