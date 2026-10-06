import { Monitor, Smartphone, PenTool, Video, Zap, Brain } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Every entry resolves to a real mark in /public/stack.
 * Brand logos come from the vendors' own marks; the handful of entries that
 * are techniques rather than products (REST APIs, RAG, Offline-first …) get a
 * monoline glyph drawn to match the rest of the interface.
 * `wide` is for wordmark logos that would be illegible squeezed into a square.
 */
export interface StackItem {
  name: string;
  icon: string;
  wide?: boolean;
}

const stack = (name: string, file: string, wide = false): StackItem => ({
  name,
  icon: `/stack/${file}`,
  ...(wide ? { wide } : {})
});

/** A question a buyer actually asks, and the answer, in that order. */
export interface Faq {
  question: string;
  answer: string;
}

export interface Service {
  /** Path segment. `/services/<slug>` is a real, prerendered page. */
  slug: string;
  title: string;
  icon: LucideIcon;
  desc: string;
  /**
   * The page's opening line, written to stand alone.
   *
   * Answer engines lift the first sentence or two of a page to decide whether
   * it answers the query, so this states what the thing is and who it is for
   * before any positioning.
   */
  lede: string;
  /** Body copy for the service page. Blank-line separated paragraphs. */
  detail: string;
  /** The problems this capability exists to remove. */
  solves: string[];
  /** Answered on the page and emitted as FAQPage schema. */
  faqs: Faq[];
  stack: StackItem[];
}

/**
 * Order is the message.
 *
 * Automation and applied AI lead because that is the specialism people should
 * come here for, and because a generative engine asked "who builds WhatsApp
 * and M-Pesa automations in Kenya?" needs to meet that answer first, not
 * fourth. The rest keep their full cards — a sales agent is only useful if
 * there is somewhere for the order to land.
 */
export const services: Service[] = [
  {
    slug: 'intelligent-automation',
    title: 'Intelligent Automation',
    icon: Zap,
    desc: 'Connected systems that automate repetitive work, reduce errors, and keep your business running efficiently.',
    lede: 'I build workflow automations that remove manual steps from a business — WhatsApp order flows, M-Pesa payment confirmation, rent and booking reminders, and back-office sync — mostly on n8n, Make and direct API integrations.',
    detail: `Automation work starts with a specific complaint, not a platform. Someone is confirming M-Pesa payments by hand at 11pm. Enquiries sit unanswered for four hours because nobody is at a desk. Numbers get copied out of WhatsApp into a spreadsheet, and occasionally copied wrong.

**Each of those is one workflow, not a transformation project.** I map the step, build the system that removes it, and instrument it so you can see whether it actually worked. A WhatsApp flow that confirms an order, triggers the STK push, and writes the record typically costs less than one month of doing the same work by hand.

The integrations I reach for most are the ones East African businesses actually run on: **the M-Pesa Daraja API** for payments and callbacks, the **WhatsApp Business API** for the channel customers already use, and **n8n** for the orchestration — self-hostable, so the workflows stay yours.

Where a system is doing real volume, it gets tested like software. The WhatsApp sales agent in the case studies carries 176 automated assertions across five test suites, and was refactored from 11 workflows and 172 nodes down to 6.`,
    solves: ['Repetitive tasks', 'Human error', 'Time-consuming workflows'],
    faqs: [
      {
        question: 'Can you integrate M-Pesa with WhatsApp?',
        answer:
          'Yes — that is one of the most common systems I build. A customer places an order in WhatsApp, the workflow triggers an M-Pesa STK push, listens for the Daraja callback, confirms the payment back in the chat, and writes the record to wherever you keep them. No one confirms anything by hand.'
      },
      {
        question: 'Do you use n8n, Make or Zapier?',
        answer:
          'All three, chosen per job. n8n is the default for anything with real logic or volume because it can be self-hosted, has no per-task pricing, and the workflows remain your property. Make suits visual, mid-complexity flows. Zapier is worth it when a client already lives in it and the job is simple.'
      },
      {
        question: 'How long does an automation take to build?',
        answer:
          'A single well-defined workflow — one trigger, one outcome — is usually days rather than weeks. Multi-step systems with payments, approvals and reporting take longer. The scoping conversation gives you a fixed figure in writing before anything is built.'
      },
      {
        question: 'What happens if the automation breaks?',
        answer:
          'Systems are built with error branches and failure notifications rather than silent failure, so you find out from the system instead of from a customer. Where the work is ongoing, monitoring and maintenance are part of the arrangement.'
      }
    ],
    stack: [
      stack('n8n', 'n8n.svg'),
      stack('Make', 'make.svg'),
      stack('Zapier', 'zapier.svg'),
      stack('Webhooks', 'webhooks.svg'),
      stack('M-Pesa API', 'mpesa.svg', true),
      stack('WhatsApp API', 'whatsapp.svg'),
      stack('Meta API', 'meta.svg'),
      stack('Google Workspace', 'google-workspace.svg'),
      stack('Airtable', 'airtable.svg'),
      stack('Supabase', 'supabase.svg')
    ]
  },
  {
    slug: 'applied-ai',
    title: 'Applied AI',
    icon: Brain,
    desc: 'Practical AI solutions that enhance products, automate workflows, and solve real business problems.',
    lede: 'I build AI systems that do one job properly — sales agents that qualify and close in WhatsApp, document processors that read what nobody has time to read, and retrieval systems that answer from your own data rather than guessing.',
    detail: `The AI projects that pay for themselves are dull and specific. One bottleneck, one workflow, measured properly. The ambitious ones tend to stay in a document.

What that looks like in practice: **an agent that handles an enquiry end to end in WhatsApp** — understands the request, quotes, takes payment, and escalates to a human when it should. **A document pipeline** that extracts structured data from PDFs a person would otherwise retype. **A retrieval system** grounded in your own content, so answers come from your documents instead of the model's imagination.

I work across **OpenAI, Claude, Gemini and open models via OpenRouter**, picking per task rather than per preference, and build with **tool calling, RAG and MCP** where they earn their place. The decision that matters is usually not which model — it is what the system does when the model is wrong.

**A narrow system that ships beats a brilliant one that stays in a document.** Every AI build starts by naming the manual work it is meant to remove, so there is something to measure afterwards.`,
    solves: [
      'Repetitive knowledge work',
      'Slow decision-making',
      'AI ideas that never ship'
    ],
    faqs: [
      {
        question: 'What can AI realistically do for a small business?',
        answer:
          'Remove specific bottlenecks: answering enquiries the moment they arrive, reading and extracting data from documents, drafting and following up, and qualifying leads before a human spends time on them. It does not replace judgement or relationships, and any proposal that claims it does is worth ignoring.'
      },
      {
        question: 'Can an AI agent take payments?',
        answer:
          'Yes. The WhatsApp AI sales agent in the case studies handles the conversation, triggers an M-Pesa STK push at the right moment, confirms the payment, and hands off to a human on anything it should not decide alone.'
      },
      {
        question: 'Which AI model do you use?',
        answer:
          'Whichever fits the task — OpenAI, Claude, Gemini, DeepSeek, or an open model through OpenRouter. Models are swappable; the system around them is the actual work. Builds are structured so changing the model later is a configuration change, not a rewrite.'
      },
      {
        question: 'Is my business data used to train the model?',
        answer:
          'No. Systems are built against API endpoints with training disabled, and where data sensitivity demands it, the retrieval layer and storage stay under your control.'
      }
    ],
    stack: [
      stack('OpenAI', 'openai.svg'),
      stack('Claude', 'claude.svg'),
      stack('Gemini', 'gemini.svg'),
      stack('DeepSeek', 'deepseek.svg'),
      stack('OpenRouter', 'openrouter.svg'),
      stack('LangChain', 'langchain.svg'),
      stack('MCP', 'mcp.svg'),
      stack('Prompt Engineering', 'prompt-engineering.svg'),
      stack('AI Agents', 'ai-agents.svg'),
      stack('RAG', 'rag.svg'),
      stack('Function Calling', 'function-calling.svg'),
      stack('APIs', 'apis.svg')
    ]
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    icon: Monitor,
    desc: 'Custom websites and web applications built to attract, convert, and support real business growth. Fast, scalable, and tailored to how your business operates.',
    lede: 'I build websites and web applications that do a job — take the order, qualify the lead, run the operation — rather than sit there looking finished.',
    detail: `Most business websites fail before a visitor reads a word, and it is rarely the design. They were built to exist, not to convert. No clear offer, no reason to act today, and no system behind the contact form, so the enquiry lands in an inbox nobody opens on a Saturday.

A site has about five seconds to answer three questions: **what do you do, who is it for, and what should I do next.** If a stranger cannot answer all three from the first screen, the design was never the bottleneck.

The platforms in the case studies range from marketplaces with wallets and M-Pesa withdrawals, through agent operations dashboards, to student-facing tools serving six figures of users. **What they have in common is a system behind the interface** — payments, records, notifications, and something that happens automatically when a visitor raises their hand.`,
    solves: ['Invisible online', 'Low conversions', 'Slow & outdated platforms'],
    faqs: [
      {
        question: 'How much does a website cost in Kenya?',
        answer:
          'Scope decides price, so there is no menu here. A brochure site and a platform with payments, accounts and an admin panel are different projects with different numbers. Describe what is broken and you get a fixed figure in writing, not a bracket.'
      },
      {
        question: 'Can you integrate M-Pesa payments into a website?',
        answer:
          'Yes — STK push, C2B, callbacks, reconciliation and the records around them. Several of the platforms in the case studies run live M-Pesa payment flows.'
      },
      {
        question: 'Do you redesign existing websites?',
        answer:
          'Where a redesign is actually the fix. Often it is not — new colours on an unclear offer is still an unclear offer. The first conversation establishes whether the problem is the design, the offer, or the absence of a system behind it.'
      }
    ],
    stack: [
      stack('React', 'react.svg'),
      stack('Next.js', 'nextjs.svg'),
      stack('TypeScript', 'typescript.svg'),
      stack('JavaScript', 'javascript.svg'),
      stack('PHP', 'php.svg'),
      stack('Laravel', 'laravel.svg'),
      stack('Node.js', 'nodejs.svg'),
      stack('Express', 'express.svg'),
      stack('HTML', 'html.svg'),
      stack('CSS', 'css.svg'),
      stack('Tailwind CSS', 'tailwind.svg'),
      stack('SQL', 'sql.svg'),
      stack('PostgreSQL', 'postgresql.svg'),
      stack('MySQL', 'mysql.svg'),
      stack('Supabase', 'supabase.svg'),
      stack('Firebase', 'firebase.svg'),
      stack('REST APIs', 'rest-api.svg'),
      stack('Git', 'git.svg')
    ]
  },
  {
    slug: 'software-development',
    title: 'Software Development',
    icon: Smartphone,
    desc: 'Custom mobile and desktop applications that simplify operations, improve productivity, and scale with your business.',
    lede: 'I build mobile and desktop applications for businesses whose workflow does not fit off-the-shelf software — including apps that keep working when the connection does not.',
    detail: `Custom software is worth building when the alternative is bending your operation around a product that was designed for someone else's. The apps in the case studies exist because nothing on the shelf did the job: a monitoring system for a fleet of devices, a savings tool, an SMS operation, an agent sales app that passed 5,000 downloads.

**Offline-first matters here more than it does in most markets.** An app used by a field agent in Kisii cannot assume a connection, so state is held locally and reconciled when the network returns rather than failing in front of a customer.

Where a mobile app is part of a larger system — payments, dashboards, automations — it gets built as part of that system rather than as an island with an API bolted on afterwards.`,
    solves: ['Manual processes', 'Disconnected workflows', 'Generic software'],
    faqs: [
      {
        question: 'Do you build for Android and iOS?',
        answer:
          'Yes — cross-platform with Flutter where a single codebase serves both, and native Android with Kotlin or Java where the job needs deeper platform access.'
      },
      {
        question: 'Can the app work without internet?',
        answer:
          'Yes. Offline-first is the default for anything used in the field: the app holds state locally and reconciles when the connection returns, rather than failing at the moment someone is standing in front of a customer.'
      },
      {
        question: 'Do you publish to the Play Store?',
        answer:
          'Yes, including store listing, assets and the review process. Several of the apps in the case studies are live on Google Play.'
      }
    ],
    stack: [
      stack('Flutter', 'flutter.svg'),
      stack('Dart', 'dart.svg'),
      stack('Android', 'android.svg'),
      stack('Kotlin', 'kotlin.svg'),
      stack('Java', 'java.svg'),
      stack('Firebase', 'firebase.svg'),
      stack('SQLite', 'sqlite.svg'),
      stack('Supabase', 'supabase.svg'),
      stack('REST APIs', 'rest-api.svg'),
      stack('Offline-first', 'offline-first.svg'),
      stack('Push Notifications', 'push-notifications.svg'),
      stack('Play Store', 'playstore.svg')
    ]
  },
  {
    slug: 'visual-design',
    title: 'Visual Design',
    icon: PenTool,
    desc: 'Brand identities and marketing assets designed to communicate clearly, build trust, and leave lasting impressions.',
    lede: 'I design brand identities and marketing assets for businesses that need to be understood in a glance — menus, price lists, campaign posters, and full brand kits.',
    detail: `Design work here is in service of a decision. A hotel menu that lets a guest choose without asking. A price list an agent can send into a WhatsApp group and have people act on. A brand kit that keeps an institution looking like itself across a dozen people making assets.

**Most of the design in the case studies exists because something was slow or unclear**, not because something was ugly. That is the brief I work best with.`,
    solves: ['Weak branding', 'Poor first impressions', 'Inconsistent visual identity'],
    faqs: [
      {
        question: 'Do you design full brand identities?',
        answer:
          'Yes — logo, colour, type, and the usage rules that keep it consistent once other people start making assets with it. The Kenya Learn Academy brand kit in the case studies is an example.'
      },
      {
        question: 'Can you design assets for social media campaigns?',
        answer:
          'Yes. A lot of the design work in the case studies is campaign material built to be read fast on a phone — price lists, offer posters and announcements distributed through WhatsApp and social feeds.'
      }
    ],
    stack: [
      stack('Illustrator', 'illustrator.svg'),
      stack('Photoshop', 'photoshop.svg'),
      stack('CorelDRAW', 'coreldraw.svg'),
      stack('Canva', 'canva.svg'),
      stack('Affinity Designer', 'affinity-designer.svg'),
      stack('Figma', 'figma.svg'),
      stack('PixelLab', 'pixellab.png')
    ]
  },
  {
    slug: 'video-production',
    title: 'Video Production',
    icon: Video,
    desc: 'Purpose-driven video editing that captures attention, tells your story, and keeps audiences engaged.',
    lede: 'I edit video that has a job to do — product demos, promotional pieces and social content built to hold attention past the first three seconds.',
    detail: `Video is the format most often made without a purpose attached. The edit decisions that matter — where to cut, what to remove, how to open — all follow from knowing what the viewer is meant to do afterwards.

Work ranges from **promotional and event pieces through to product walkthroughs** for the systems I build, which turn out to be the most useful sales asset a technical product can have.`,
    solves: ['Low engagement', 'Weak storytelling', 'Content that gets ignored'],
    faqs: [
      {
        question: 'Do you shoot video or only edit?',
        answer:
          'Primarily post-production: editing, colour, sound, motion graphics and delivery. Where a shoot is needed I work with footage you supply or coordinate it as part of the project.'
      },
      {
        question: 'Can you make a demo video for a software product?',
        answer:
          'Yes, and it is one of the more useful things a technical product can have. Screen capture, narration and a structure that shows the product doing the thing a buyer cares about rather than touring every feature.'
      }
    ],
    stack: [
      stack('Premiere Pro', 'premiere-pro.svg'),
      stack('DaVinci Resolve', 'davinci-resolve.svg'),
      stack('After Effects', 'after-effects.svg'),
      stack('CapCut', 'capcut.svg'),
      stack('Filmora', 'filmora.svg'),
      stack('Audition', 'audition.svg'),
      stack('Kdenlive', 'kdenlive.svg')
    ]
  }
];

export const findService = (slug: string) => services.find((s) => s.slug === slug);
