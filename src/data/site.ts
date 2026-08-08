export const site = {
  /** Real name — leads everywhere on the site. */
  name: 'Reinhard Bonke',
  /** The work name. Always secondary to `name`, never on its own. */
  workName: 'Tricreta',
  email: 'tricreta@gmail.com',
  phone: '+254727921038',
  phoneHref: 'tel:+254727921038',
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
  }
} as const;

/**
 * The About story, paragraph by paragraph. `**wrapped**` runs render as
 * accented emphasis — see `lib/emphasise`.
 */
export const aboutParagraphs = [
  "I'm **Reinhard Bonke**, better known as **Tricreta**, a Kenyan software developer, automation engineer, and digital systems builder. I specialize in turning complex business challenges into **simple, reliable software** that saves time, improves efficiency, and helps businesses grow.",
  "Over the years, I've worked across **web development**, **mobile applications**, **artificial intelligence**, **automation**, **graphic design**, and **video production**. That broad experience allows me to look beyond individual technologies and design complete digital ecosystems where every part works together seamlessly.",
  'My work ranges from **AI-powered business platforms** and custom web applications to **WhatsApp automation**, **M-Pesa integrations**, workflow automation, and mobile apps used by real businesses every day. I enjoy solving problems that **off-the-shelf software can’t solve**, building systems tailored to the unique way each business operates.',
  "I believe **technology should quietly do its job**. The best software isn't the one with the most features. It's the one that **removes friction**, **reduces manual work**, and gives people more time to focus on what matters.",
  "Away from client work, I spend much of my time exploring **emerging AI technologies**, experimenting with automation, and learning how modern systems can become faster, smarter, and more connected. I'm constantly building, testing, and refining ideas because **the best way to stay ahead is to keep creating**.",
  "I'm currently based in **Kenya**, where I continue to build digital products for businesses, startups, and organizations looking for **practical technology that delivers measurable results**."
];

/** Stat tile in the About modal: a figure, and what it counts. */
export interface AboutFact {
  value: string;
  label: string;
}

export const aboutFacts: AboutFact[] = [
  { value: '732+', label: 'Projects completed' },
  { value: '6+', label: 'Years building' },
  { value: 'AI', label: '& automation specialist' },
  { value: 'KE', label: 'Based in Kenya' }
];
