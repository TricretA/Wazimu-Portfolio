import { motion, useReducedMotion } from 'motion/react';
import { services, type StackItem } from '../data/services';

function StackChip({ item }: { item: StackItem }) {
  return (
    <span
      className={`stack-chip${item.wide ? ' stack-chip--wide' : ''}`}
      data-name={item.name}
      tabIndex={0}
      role="img"
      aria-label={item.name}
    >
      <img src={item.icon} alt="" loading="lazy" aria-hidden="true" />
    </span>
  );
}

export default function Capability() {
  const reduce = useReducedMotion();

  return (
    <section id="capability" className="section-band section-divider relative">
      <div className="shell-width">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-head"
        >
          <h2 className="section-title">What I build — and what it fixes</h2>
          <p className="section-copy">
            Scope decides price, so there are no numbers here. Tell me what is broken and
            you get a fixed figure in writing, not a bracket.
          </p>
        </motion.div>

        <div className="hue-cycle mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: reduce ? 0 : Math.min(index * 0.06, 0.3),
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="glass-card group flex flex-col items-center p-6 text-center hover:-translate-y-1"
              >
                <div className="cat-tile mb-5">
                  <Icon strokeWidth={1.5} className="h-5 w-5" />
                </div>

                <h3 className="text-[1.05rem] font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-[0.84rem] leading-relaxed text-[var(--muted)]">
                  {service.desc}
                </p>

                <div className="mt-6 w-full border-t border-[var(--line-soft)] pt-5">
                  <div className="mono-tag mb-3 !text-[var(--success)]">Solves</div>
                  <div className="flex flex-wrap justify-center gap-x-2 gap-y-1.5">
                    {service.solves.map((item, position) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 text-[0.8rem] font-medium text-[var(--success)]"
                      >
                        {item}
                        {/* Separator trails its own item so a wrap never starts a
                            line with a dangling pipe. */}
                        {position < service.solves.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="text-[var(--line-strong)] opacity-70"
                          >
                            |
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 w-full border-t border-[var(--line-soft)] pt-5">
                  <div className="mono-tag mb-3">Stack</div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {service.stack.map((item) => (
                      <StackChip key={item.name} item={item} />
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
