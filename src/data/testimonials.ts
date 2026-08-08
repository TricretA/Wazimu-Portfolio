import { GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * ⚠️ ONE THING LEFT TO FILL IN
 *
 * `name` — the four entries below that only gave a company and a role have
 * `name: null`. Names are never invented here; add the real one and it renders
 * as the headline immediately.
 *
 * Avatars resolve in this order: `photo` (a headshot or brand mark in
 * /public/avatars) → `icon` (a lucide glyph, for clients with neither) →
 * generated initials disc. Every row therefore looks deliberate.
 *
 * `projectSlug` is the green button on each card. Skyscope's quote covers
 * several projects, so it currently points at Skylink Bingwa — change the slug
 * if a different one is the better showcase.
 */

export interface Testimonial {
  /** Person's full name, when they gave one. */
  name: string | null;
  role: string | null;
  business: string;
  projectSlug: string;
  quote: string;
  photo: string | null;
  /** Fallback mark when there is no photo but a glyph fits the client. */
  icon?: LucideIcon;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Bernard Kimathi',
    role: null,
    business: 'KUCCPS Course Checker',
    projectSlug: 'kuccps-course-checker',
    quote:
      'TriCreta built exactly what we had envisioned. The platform is simple to use, works reliably, and makes it easy for students to check the courses they qualify for.',
    photo: null,
    icon: GraduationCap
  },
  {
    name: 'Byron Otieno',
    role: 'Business Owner',
    business: 'Phone Monitor',
    projectSlug: 'phone-monitor',
    quote:
      'TriCreta developed a custom phone monitoring system that fits our workflow perfectly. It made managing multiple devices much easier and works reliably, saving us a lot of time.',
    photo: '/avatars/byron.png'
  },
  {
    name: null,
    role: 'Director',
    business: 'Skyscope Limited',
    projectSlug: 'skylink-bingwa',
    quote:
      "We've worked with TriCreta on several software projects, and every experience has been excellent. The solutions are reliable, well thought out, and built around our business needs. It's a team we confidently return to whenever we need something developed.",
    photo: '/avatars/skyscope.webp'
  },
  {
    name: null,
    role: 'Project Coordinator',
    business: 'Compassion PDF System',
    projectSlug: 'pdf-tracking-system',
    quote:
      'TriCreta delivered a system that simplified how we manage sponsorship payments. Automating balance calculations and SMS notifications reduced manual work and made the entire process more efficient.',
    photo: '/avatars/compassion.webp'
  },
  {
    name: null,
    role: 'Founder',
    business: 'Pesatrix',
    projectSlug: 'pesatrix',
    quote:
      'TriCreta took our idea and turned it into a complete platform that connects task providers with young people looking for online work. The system is easy to use, dependable, and captures exactly what we wanted.',
    photo: '/avatars/pesatrix.webp'
  },
  {
    name: null,
    role: 'Founder',
    business: 'Bingwa One',
    projectSlug: 'bingwaone',
    quote:
      'TriCreta built a practical platform that brings together the tools our agents use every day. Everything is organized in one place, making daily operations simpler and more efficient.',
    photo: '/avatars/bingwaone.webp'
  }
];

/** Headline for the card — the person if we have them, otherwise the company. */
export const displayName = (t: Testimonial) => t.name ?? t.business;

/** Sub-line — never repeats whatever `displayName` already showed. */
export const displayMeta = (t: Testimonial) => {
  if (t.name) return t.role ? `${t.role}, ${t.business}` : t.business;
  return t.role;
};

export const initials = (t: Testimonial) =>
  displayName(t)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.replace(/[^A-Za-z]/g, '').charAt(0))
    .join('')
    .toUpperCase();
