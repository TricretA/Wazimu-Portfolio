import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Twitter, Instagram, Mail, FileText, MoreVertical } from 'lucide-react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Kebab menu: dismiss on outside click or Escape — standard popover manners.
  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

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
        <div className="relative flex items-center justify-between gap-4">
          {/*
            Mobile only: the logo carries no name at that width, so the name
            gets its own centred slot instead of sitting next to the mark.
          */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 max-w-[50%] -translate-x-1/2 -translate-y-1/2 truncate text-center text-[0.92rem] font-bold tracking-tight sm:hidden">
            {site.name}
          </div>

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

            {/*
              Real name on top, work name underneath — never the other way
              round. Hidden below `sm`: mobile shows the logo mark only, with
              identity, About, CV and socials tucked into the kebab menu.
            */}
            <div className="hidden min-w-0 leading-tight sm:block">
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
              className="hidden rounded-full border border-[var(--line)] bg-white/5 px-4 py-2 text-[0.82rem] font-semibold text-[var(--soft)] transition-colors hover:bg-white/10 hover:text-[var(--text)] sm:block"
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

            {/*
              Mobile only: a kebab menu standing in for identity text, About,
              CV and socials — never a hamburger, there is no nav to hide.
            */}
            <div className="relative sm:hidden" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((open) => !open)}
                aria-label="More options"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white/5 text-[var(--soft)] transition-colors hover:bg-white/10 hover:text-[var(--text)]"
              >
                <MoreVertical className="h-[1.15rem] w-[1.15rem]" />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    role="menu"
                    aria-label="More options"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-[calc(100%+0.6rem)] w-56 rounded-2xl border border-[var(--line)] bg-[rgba(10,14,21,0.94)] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-xl"
                  >
                    <div className="px-2.5 pb-2 pt-1">
                      <div className="text-[0.85rem] font-bold tracking-tight">{site.name}</div>
                      <div className="mt-0.5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[var(--faint)]">
                        {site.workName}
                      </div>
                    </div>

                    <div className="my-1 border-t border-[var(--line-soft)]" />

                    <button
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        onOpenAbout();
                      }}
                      className="w-full rounded-xl px-2.5 py-2.5 text-left text-[0.85rem] font-semibold text-[var(--soft)] transition-colors hover:bg-white/8 hover:text-[var(--text)]"
                    >
                      About
                    </button>

                    <a
                      href={site.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-2.5 py-2.5 text-[0.85rem] font-semibold text-[var(--soft)] transition-colors hover:bg-white/8 hover:text-[var(--text)]"
                    >
                      <FileText className="h-3.5 w-3.5" /> CV
                    </a>

                    <div className="my-1.5 border-t border-[var(--line-soft)]" />

                    <div className="flex items-center justify-around px-1 py-1.5">
                      {socialLinks.map(({ href, label, Icon, brand }) => (
                        <a
                          key={label}
                          href={href}
                          target={href.startsWith('mailto:') ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          aria-label={label}
                          role="menuitem"
                          onClick={() => setMenuOpen(false)}
                          className="social-icon"
                          style={{ '--brand': brand } as CSSProperties}
                        >
                          <Icon className="h-[1.25rem] w-[1.25rem]" />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
