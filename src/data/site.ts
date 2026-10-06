export const site = {
  /**
   * The one place the live origin is written down.
   *
   * Canonicals, Open Graph URLs, the sitemap, JSON-LD `@id`s and llms.txt all
   * derive from this, so moving the site to another domain is a one-line
   * change rather than a search-and-replace across four HTML files.
   * No trailing slash — every consumer appends its own path.
   */
  origin: 'https://tricreta.co.ke',
  /** Real name — leads everywhere on the site. */
  name: 'Reinhard Bonke',
  /** The work name. Always secondary to `name`, never on its own. */
  workName: 'Tricreta',
  /**
   * One canonical spelling, used in every title, schema block and off-site
   * profile. Entity resolution is a consensus problem: "TriCreta" and
   * "Wazimu Creations" elsewhere read as different entities, not synonyms.
   */
  jobTitle: 'Automation Engineer & Applied AI Developer',
  /** The specialism, in the words a buyer would actually type or say. */
  specialism:
    'WhatsApp Business API, M-Pesa integrations, n8n workflow automation, and applied AI systems',
  email: 'tricreta@gmail.com',
  phone: '+254790295408',
  phoneHref: 'tel:+254790295408',
  cvUrl: 'https://flowcv.com/resume/7fwcwmo01w70',
  whatsapp:
    "https://wa.me/254790295408?text=Hello%2C%20I%27m%20reaching%20out%20because%20my%20business%20is%20experiencing%20digital%20challenges%20and%20I%20would%20like%20to%20discuss%20how%20we%20can%20fix%20them.%20I%27m%20ready%20to%20implement%20a%20proper%20solution.",
  /**
   * Private builds — client automations especially — are deliberately kept off
   * the open web, so the case study offers a walkthrough instead of a URL.
   */
  privateAccess:
    'https://wa.me/254790295408?text=Hello%2C%20I%20saw%20one%20of%20your%20private%20deployments%20on%20your%20portfolio%20and%20would%20like%20to%20request%20a%20walkthrough.',
  socials: {
    linkedin: 'https://www.linkedin.com/in/tricreta',
    x: 'https://x.com/tricreta',
    instagram: 'https://instagram.com/tricreta',
    github: 'https://github.com/TricretA'
  },
  /** Where the work happens. Feeds `areaServed` and the local-intent copy. */
  location: {
    country: 'Kenya',
    countryCode: 'KE',
    region: 'East Africa'
  }
} as const;

/**
 * Search-engine ownership verification.
 *
 * Both accept a DNS TXT record instead of a meta tag, which is the better
 * option — it survives a redeploy and does not add bytes to every page. These
 * are here for the case where DNS is not available to you.
 *
 * Bing matters more than its market share suggests: ChatGPT's search results
 * are built on the Bing index, so a site Bing has not indexed is a site
 * ChatGPT largely cannot cite.
 */
export const verification = {
  google: null as string | null,
  bing: null as string | null
};

/**
 * Privacy-friendly analytics, off until you fill this in.
 *
 * Plausible and Umami are both cookieless and need no consent banner, which
 * matters on a site whose whole purpose is loading fast for a crawler with a
 * five-second budget. Set `provider` and `domain` and the script is emitted
 * into every prerendered page; leave it null and nothing ships.
 *
 * Whichever you pick, the number worth watching is not pageviews. It is
 * referrals from chatgpt.com, perplexity.ai, claude.ai and gemini.google.com —
 * that is the only direct evidence that any of this is working.
 */
export const analytics = {
  provider: null as 'plausible' | 'umami' | null,
  /** Plausible: the domain as registered there. Umami: the website ID. */
  domain: '',
  /** Self-hosted instances only. Leave null for the hosted service. */
  scriptUrl: null as string | null
};

/**
 * Every profile that should resolve to the same person, for schema `sameAs`.
 *
 * Search engines and answer engines build an entity out of the agreement
 * between these, so a profile only belongs here once it is live and carries
 * the same name, title and contact details as this site.
 */
export const sameAs: string[] = [
  site.socials.linkedin,
  site.socials.x,
  site.socials.instagram,
  site.socials.github,
  'https://github.com/wazimuautomate',
  site.cvUrl
];

/**
 * The topics this person is credibly an expert in — schema `knowsAbout`.
 *
 * Deliberately specific. "Software development" describes a million people;
 * "M-Pesa Daraja API" describes a few hundred, and those are the queries
 * worth being the answer to.
 */
export const knowsAbout: string[] = [
  'WhatsApp Business API',
  'M-Pesa Daraja API integration',
  'n8n workflow automation',
  'AI agents and tool calling',
  'Retrieval-Augmented Generation (RAG)',
  'Business process automation',
  'Make (Integromat)',
  'Zapier',
  'Model Context Protocol (MCP)',
  'Prompt engineering',
  'React',
  'TypeScript',
  'Node.js',
  'Laravel',
  'Supabase',
  'PostgreSQL',
  'Mobile app development',
  'REST API design'
];

/**
 * The About story, paragraph by paragraph. `**wrapped**` runs render as
 * accented emphasis — see `lib/emphasise`.
 */
export const aboutParagraphs = [
  "I'm **Reinhard Bonke**, better known as **Tricreta**, a Kenyan **automation engineer and applied AI developer**. I build the systems that remove repetitive work from a business — **WhatsApp automations, M-Pesa payment flows, n8n workflows, and AI agents** that do a specific job properly rather than impressively.",
  'Most of my work starts with the same complaint: something in the business is being done by hand that should not be. A payment confirmed manually at 11pm. An enquiry answered four hours late. Numbers copied from WhatsApp into a spreadsheet. **I build the system that makes that step disappear**, and then I measure whether it actually did.',
  "Alongside automation and AI, I build the things those systems usually need around them — **web platforms, mobile applications, brand design, and video**. That range is deliberate: a WhatsApp sales agent is only useful if there's somewhere for the order to land, and most businesses would rather not assemble that from four freelancers.",
  "I believe **technology should quietly do its job**. The best software isn't the one with the most features. It's the one that **removes friction**, **reduces manual work**, and gives people more time to focus on what matters.",
  "Away from client work, I spend much of my time exploring **emerging AI technologies**, experimenting with automation, and learning how modern systems can become faster, smarter, and more connected. I'm constantly building, testing, and refining ideas because **the best way to stay ahead is to keep creating**.",
  "I'm based in **Kenya** and work with businesses across **East Africa and remotely worldwide**, building **practical technology that delivers measurable results**."
];

/** Stat tile in the About modal: a figure, and what it counts. */
export interface AboutFact {
  value: string;
  label: string;
}

/**
 * Every figure here has to be defensible against the rest of the site.
 *
 * A visitor who reads "732+ projects" and then counts 48 case studies stops
 * believing the other numbers too, and a generative engine reading both in one
 * pass has no way to reconcile them. These four are all checkable from the page.
 */
export const aboutFacts: AboutFact[] = [
  { value: '48', label: 'Documented case studies' },
  { value: '6+', label: 'Years building' },
  { value: 'AI', label: '& automation specialist' },
  { value: 'KE', label: 'Based in Kenya' }
];

/** Absolute URL for any site path. Feeds canonicals, OG tags and the sitemap. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${site.origin}${path.startsWith('/') ? path : `/${path}`}`;
}
