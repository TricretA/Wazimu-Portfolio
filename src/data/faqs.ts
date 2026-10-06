import { site } from './site';
import type { Faq } from './services';

/**
 * The questions a buyer asks before they get in touch.
 *
 * They live in the data layer rather than inside the contact component so the
 * page and the FAQPage schema are generated from one list — two copies of an
 * answer is how a page ends up saying one thing to a person and another to a
 * crawler.
 */
export const contactFaqs: Faq[] = [
  {
    question: 'How much does a project cost?',
    answer:
      'Scope decides price, so there is no price list. Describe what is broken and you get a fixed figure in writing before anything is built — not an hourly rate and not a bracket.'
  },
  {
    question: 'Do you work with clients outside Kenya?',
    answer:
      'Yes. The work is remote by default and clients span East Africa and further afield. Payment, calls and delivery all work the same either way.'
  },
  {
    question: 'How long does a project take?',
    answer:
      'A single well-defined automation is usually days. A platform with payments, accounts and an admin panel is weeks. The scoping conversation gives you a timeline in writing alongside the figure.'
  },
  {
    question: 'What do you need from me to start?',
    answer:
      'A description of the problem, not a specification. What is being done by hand, what it costs you, and what should happen instead. The technical decisions are mine to make and defend.'
  },
  {
    question: 'What is the fastest way to reach you?',
    answer: `WhatsApp on ${site.phone}. Email at ${site.email} works too, and both reach me directly.`
  }
];
