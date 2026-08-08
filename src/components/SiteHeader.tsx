import { useEffect, useState, type CSSProperties } from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Instagram, Mail, FileText } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { site } from '../data/site';

interface Props {
  onOpenAbout: () => void;
}

/**
 * `brand` is each platform's own colour, shown on hover. Instagram and Gmail
 * are multicolour marks, so each uses the hue its logo leads with — a gradient
 * would not read at this size.
 */
const socialLinks = [
  { href: site.whatsapp, label: 'WhatsApp', Icon: FaWhatsapp, brand: '#25d366' },
  { href: `mailto:${site.email}`, label: 'Email', Icon: Mail, brand: '#ea4335' },
  { href: site.socials.linkedin, label: 'LinkedIn', Icon: Linkedin, brand: '#0a66c2' },
  { href: site.socials.x, label: 'X', Icon: Twitter, brand: '#1da1f2' },
  { href: site.socials.instagram, label: 'Instagram', Icon: Instagram, brand: '#e4405f' }
];

export default function SiteHeader({ onOpenAbout }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`pointer-events-auto mt-3 w-[calc(100%-1.5rem)] max-w-[1180px] transition-all duration-300 ${
          scrolled ? 'glass-bar px-4 py-2.5' : 'px-4 py-3.5'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Identity */}
          <div className="flex min-w-0 items-center gap-3">
            <a href="#top" aria-label="Back to top" className="flex-shrink-0">
              <img
                src="/logo.webp"
                alt={site.name}
                width={48}
                height={48}
                className="h-11 w-11 rounded-full border border-[var(--line)] object-cover sm:h-12 sm:w-12"
              />
            </a>

            {/* Real name on top, work name underneath — never the other way round. */}
            <div className="min-w-0 leading-tight">
              <div className="text-[0.9rem] font-bold tracking-tight sm:text-[0.98rem]">
                <span>{site.name}</span>
                <span className="mx-1.5 font-normal text-[var(--faint)]">|</span>
                {/*
                  Rendered as a tel: link so the number is tappable on mobile —
                  it is the fastest contact route on this site.
                */}
                <a
                  href={site.phoneHref}
                  className="whitespace-nowrap text-[var(--success)] transition-opacity hover:opacity-80"
                >
                  {site.phone}
                </a>
              </div>
              <div className="mt-0.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[var(--faint)]">
                {site.workName}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenAbout}
              className="rounded-full border border-[var(--line)] bg-white/5 px-4 py-2 text-[0.82rem] font-semibold text-[var(--soft)] transition-colors hover:bg-white/10 hover:text-[var(--text)]"
            >
              About
            </button>

            <a
              href={site.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-[var(--line)] bg-white/5 px-4 py-2 text-[0.82rem] font-semibold text-[var(--soft)] transition-colors hover:bg-white/10 hover:text-[var(--text)] sm:flex"
            >
              <FileText className="h-3.5 w-3.5" /> CV
            </a>

            <div className="ml-0.5 hidden items-center gap-4 border-l border-[var(--line-soft)] pl-3.5 md:flex">
              {socialLinks.map(({ href, label, Icon, brand }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-icon"
                  style={{ '--brand': brand } as CSSProperties}
                >
                  <Icon className="h-[1.15rem] w-[1.15rem]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
