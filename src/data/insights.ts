export interface Insight {
  id: number;
  slug: string;
  title: string;
  /** Minutes — rendered as "N minute read". */
  minutes: number;
  /** One line for the card, above the fold. */
  dek: string;
  /**
   * Blank-line separated paragraphs. `**wrapped**` text renders as the accent
   * emphasis, so the point of each paragraph is visible before it is read.
   */
  body: string;
}

export const insights: Insight[] = [
  {
    id: 1,
    slug: 'why-kenyan-business-websites-fail',
    title: "Why most Kenyan business websites fail (it's not the design)",
    minutes: 2,
    dek: 'A site that exists is not a site that works. Most were never built to do a job.',
    body: `Most Kenyan business websites fail before a visitor reads a single word. Not because they look bad — plenty of them look fine. They fail because **they were built to exist, not to convert.** The owner paid someone KSh 8,000, got a hero image and a contact form, and called it done.

Look at what that site is actually being asked to do. It has no clear offer. It gives no reason to act today rather than next month. There is no system behind the form — the enquiry lands in an inbox nobody opens on a Saturday. The design was never the bottleneck.

A website is not a business card. **It is a salesperson that works every hour you don't.** And like any salesperson, it has about five seconds to answer three questions: what do you do, who is it for, and what should I do next. If a stranger cannot answer all three from the first screen, the site is quietly costing you customers every single day.

The uncomfortable part is that a redesign rarely fixes this. New colours on an unclear offer is still an unclear offer. **What needs to change is the thinking underneath** — the offer, the path a visitor takes, and what happens automatically the moment they raise their hand.

Start there, and the design becomes the easy part.`
  },
  {
    id: 2,
    slug: 'real-cost-of-doing-it-manually',
    title: 'The real cost of doing it manually',
    minutes: 2,
    dek: "The most expensive line in your business doesn't appear on any invoice.",
    body: `Every time you manually confirm an M-Pesa payment, retype a customer reply at 11pm, or copy numbers from WhatsApp into a spreadsheet, you are paying for it. **The cost just never shows up on a balance sheet**, so it never gets questioned.

Add it up honestly. Twenty minutes a day of copying and confirming is roughly ten hours a month. Ten hours you could have spent selling, or not working at all. Then add the orders that quietly went to a competitor because you replied four hours late, and the cost stops looking small.

Automation is not a luxury reserved for companies with a technology department. A WhatsApp flow that confirms an order, triggers the M-Pesa prompt, and updates your records **costs less than one month of doing that same work by hand** — and then keeps doing it every month afterwards for free.

The real question was never whether you can afford to automate. It is whether you can keep affording not to. **Money can be earned back. Time cannot.**`
  },
  {
    id: 3,
    slug: 'ill-add-ai-later',
    title: "Why 'I'll add AI later' is a decision you'll regret",
    minutes: 2,
    dek: 'Waiting feels neutral. It is not — the gap compounds while you wait.',
    body: `"We'll look at AI next year" sounds like a cautious decision. It isn't a neutral one. **Every month you wait, a competitor who started last quarter gets faster, cheaper, and harder to catch** — not because the technology is magic, but because operational efficiency compounds the same way interest does.

It helps to be precise about what AI actually does in a small business. It does not replace your judgement or your relationships. **It removes the bottlenecks that keep you stuck at the same revenue ceiling** — the enquiries you can't answer fast enough, the documents nobody has time to read, the follow-ups that never happen.

That is also why the ambitious projects are the wrong place to start. The systems that pay for themselves are dull and specific: one workflow, one bottleneck, measured properly. **A narrow system that ships beats a brilliant one that stays in a document.**

The best time to start was six months ago. The second best is this week — and the first thing to build is the smallest one that removes real work.`
  }
];
