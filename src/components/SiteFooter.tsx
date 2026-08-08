import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { site } from '../data/site';
import { problemCount } from '../data/problems';

/** 23 → "23rd". Handles the 11/12/13 exceptions. */
function ordinal(value: number) {
  const lastTwo = value % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return `${value}th`;
  const suffix = { 1: 'st', 2: 'nd', 3: 'rd' }[value % 10] ?? 'th';
  return `${value}${suffix}`;
}

export default function SiteFooter() {
  const reduce = useReducedMotion();

  return (
    <footer id="contact" className="section-divider relative overflow-hidden">
      <div className="shell-width relative z-[1] py-24 text-center sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="display-title">
            What&apos;s the one thing
            <br className="hidden sm:block" /> slowing you down?
          </h2>
          <p className="section-copy">
            {problemCount} serious problems solved so far. Bring me the {ordinal(problemCount + 1)}.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button whatsapp-button breathe w-full sm:w-auto"
            >
              <FaWhatsapp className="h-4 w-4" /> Start on WhatsApp
            </a>
            <a href={`mailto:${site.email}`} className="secondary-button w-full sm:w-auto">
              <Mail className="h-4 w-4" /> Let's discuss it on email
            </a>
          </div>
        </motion.div>
      </div>

      <div className="shell-width relative z-[1] border-t border-[var(--line-soft)] py-7">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-5 text-xs font-medium text-[var(--muted)]">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-[var(--text)]"
            >
              GitHub <ArrowUpRight className="h-3 w-3" />
            </a>
            <a
              href={site.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-[var(--text)]"
            >
              CV <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>

          <p className="m-0 text-xs text-[var(--faint)]">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>

      <span className="ghost-word" aria-hidden="true">
        TRICRETA
      </span>
    </footer>
  );
}
