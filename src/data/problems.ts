import { Globe, Smartphone, Workflow, Palette, Clapperboard, LayoutGrid } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ProblemCategory =
  | 'Websites'
  | 'Mobile Apps'
  | 'Design'
  | 'Automation'
  | 'Video Editing';

export type FilterCategory = 'All' | ProblemCategory;

export const categories: FilterCategory[] = [
  'All',
  'Websites',
  'Mobile Apps',
  'Automation',
  'Design',
  'Video Editing'
];

/** Each category carries its own glyph, on the filter chips and on every card. */
export const categoryIcon: Record<FilterCategory, LucideIcon> = {
  All: LayoutGrid,
  Websites: Globe,
  'Mobile Apps': Smartphone,
  Automation: Workflow,
  Design: Palette,
  'Video Editing': Clapperboard
};

/**
 * `public`  — has a live, verifiable URL anyone can open.
 * `private` — shipped and running, but the client keeps it off the open web.
 */
export type ProblemStatus = 'public' | 'private';

export interface SolvedProblem {
  slug: string;
  title: string;
  /** One line for the card — what the thing is, before the problem/solution detail. */
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  /**
   * Card artwork. Live sites use a captured screenshot in /public/work; phone
   * screenshots and design pieces use a composited tile from the same folder.
   * `null` renders a generated placeholder.
   */
  image: string | null;
  link: string | null;
  linkText: string | null;
  /** Public source URL when the project owner has made the code available. */
  repoUrl?: string;
  /** Whether the source is browsable. `private` renders the ownership note. */
  repo: 'public' | 'private';
  category: ProblemCategory;
  status: ProblemStatus;
}

export const solvedProblems: SolvedProblem[] = [
  {
    slug: 'pesatrix',
    title: 'Pesatrix',
    summary:
      'A Kenyan digital task platform connecting people looking for online income with businesses offering micro-tasks.',
    problem:
      'Many young people have limited access to flexible income opportunities, while businesses and organizations need people to complete simple digital tasks.',
    solution:
      'Connects task providers with users through a platform for task discovery, completion, referrals, wallet management, and M-Pesa withdrawals.',
    outcome:
      'Creates a structured marketplace for digital tasks and makes earning and withdrawing money more accessible to users.',
    image: '/work/pesatrix.webp',
    link: 'https://pesatrix.co.ke',
    linkText: 'Open Pesatrix',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'bingwaone',
    title: 'BingwaOne',
    summary:
      'A unified platform for managing the sales and daily operations of Bingwa Sokoni agents.',
    problem:
      'Agents rely on multiple disconnected tools for selling bundles, managing customers, handling payments, and running their businesses.',
    solution:
      'Brings sales, onboarding, customer management, storefronts, payments, messaging, subscriptions, and administration into one platform.',
    outcome:
      'Simplifies daily operations, reduces tool switching, and gives agents a more organized way to run and grow their businesses.',
    image: '/work/bingwaone.webp',
    link: 'https://bingwaone.co.ke',
    linkText: 'Open BingwaOne',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'valuehomepros',
    title: 'ValueHomePros',
    summary:
      'A lead-generation platform connecting homeowners with vetted local home-service professionals.',
    problem:
      'Homeowners struggle to find reliable service providers, while service businesses waste money and time dealing with poor-quality or irrelevant leads.',
    solution:
      'Captures and validates homeowner requests, matches them with relevant service providers, and manages lead distribution through a centralized system.',
    outcome:
      'Improves lead quality, simplifies the connection between homeowners and businesses, and supports a scalable pay-per-accepted-lead model.',
    image: '/work/valuehomepros.webp',
    link: 'https://valuehomepros.com',
    linkText: 'Open ValueHomePros',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'blue-horizon-estates',
    title: 'Blue Horizon Estates',
    summary:
      'A public home for a rural affordable-housing developer — the mission, the homes already delivered, and the partners it needs to reach the next stage.',
    problem:
      'Blue Horizon builds permanent, affordable homes in rural Southwest Washington, where ageing manufactured-home communities are disappearing and nothing is replacing them. The organisation had no public presence to explain that model, show what it had already delivered, or reach the nonprofit, tribal and public-agency partners its grant-funded projects depend on.',
    solution:
      'Built the organisation a complete site: the mission and the housing gap it answers, what it builds (modular homes on permanent foundations, preserved manufactured-home communities, small multifamily infill and site infrastructure), the flagship Camelot community, the expansion roadmap, and the partners and accountability pages funders and agencies review before committing.',
    outcome:
      'Blue Horizon now has a credible, evidence-led presence — eleven homes at full occupancy and a stated path to sixty — that partners and agencies can evaluate before a conversation ever starts.',
    image: '/work/blue-horizon-estates.webp',
    link: 'https://bluehorizonestates.com',
    linkText: 'Open Blue Horizon Estates',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'vacasky-adventure',
    title: 'VacaSky Adventure Travel Website',
    summary:
      'A high-end responsive travel website designed to showcase destinations, tours, travel stories, and booking experiences.',
    problem:
      'Travel brands need an engaging online presence that makes destinations feel inspiring while guiding visitors toward booking a trip.',
    solution:
      'Built a fully responsive travel landing page with animated sections, destination cards, booking prompts, travel blogs, FAQ, newsletter signup, custom imagery, and branded interactions.',
    outcome:
      'A polished, portfolio-ready travel website that demonstrates the ability to turn a detailed visual design into a fast, interactive, production-ready web experience.',
    image: '/work/vacasky-adventure.webp',
    link: 'https://smartadventure.netlify.app',
    linkText: 'Visit VacaSky Adventure',
    repoUrl: 'https://github.com/wazimuautomate/adventure-site',
    repo: 'public',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'lwanda-cdc',
    title: 'Lwanda Child Development Centre',
    summary:
      'A digital home for a faith-based child development centre — sponsorship, stories and giving in one place.',
    problem:
      'KE 258 Lwanda Child & Youth Development Centre has supported over 350 children in Lwanda since 2015, in partnership with Compassion International and FGCK. But the work existed only on the ground. Sponsors, partners and donors had no way to find the centre, understand its programmes, or give — so support depended entirely on personal introductions.',
    solution:
      'Built the centre a complete public presence: its three programmes (Child Survival, Child Sponsorship, Youth Development) explained clearly, real impact figures, beneficiary stories, events, a photo gallery, direct sponsorship and donation paths, and the safeguarding, privacy and terms pages a child-focused organisation is held to.',
    outcome:
      'The centre can now be found, understood and supported by anyone, and sponsorship conversations start from a credible page instead of a cold introduction.',
    image: '/work/lwanda-cdc.webp',
    link: 'https://lwandacdc.vercel.app',
    linkText: 'Open Lwanda CDC',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'mybingwa-admin',
    title: 'My Bingwa Admin Dashboard',
    summary:
      'The remote control panel behind the My Bingwa app — offers, payments and releases without shipping a build.',
    problem:
      'Every change to the My Bingwa app — a new offer, a price correction, a promo banner, a support number — meant editing the app itself and pushing a store update. Prices move daily in the bundle business, so the app was always slightly wrong, and nobody could see which payments had actually landed.',
    solution:
      'Built a super-admin dashboard that drives the live app remotely: offers and pricing, billboard adverts, push notifications, SMS rules, payment reconciliation, support details, app configuration, staged preview-and-publish, version and update control, and a full audit log of who changed what.',
    outcome:
      'Offers change in seconds instead of release cycles, revenue and confirmed payments are visible at a glance, and the app stays correct without a single new build.',
    image: '/work/mybingwa-admin.webp',
    link: null,
    linkText: null,
    repo: 'private',
    category: 'Websites',
    status: 'private'
  },
  {
    slug: 'student-doc',
    title: 'Student Doc',
    summary: 'A digital document preparation and paid-download platform for students.',
    problem:
      'Students often face slow paperwork, manual document requests, payment friction, and unnecessary back-and-forth when obtaining official documents.',
    solution:
      'Students select a document, provide their details, preview it, pay digitally, and securely receive the completed document. Documents requiring approval can be reviewed and finalized before delivery.',
    outcome:
      'Faster document processing, fewer administrative steps, and a smoother way for students and officials to handle document requests.',
    image: '/work/student-doc.webp',
    link: 'https://studentsdoc.vercel.app',
    linkText: 'Open Student Doc',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'kuccps-course-checker',
    title: 'KUCCPS Course Checker',
    summary:
      'A placement tool that tells students exactly which courses their grades qualify them for.',
    problem:
      'Students struggled to understand KUCCPS placement options. The official information was complex, static, and overwhelming, so many made blind course decisions without clarity on what they actually qualified for.',
    solution:
      'Built a course-checking system that reads a student’s KCSE grades and cluster points, explains eligibility in plain language across degrees, diplomas, certificates, KMTC, artisan and short courses, and returns structured, downloadable PDF results instead of raw cut-off tables — with an AI assistant and cluster calculator alongside it.',
    outcome:
      'Over 102,000 students have used it to check qualification in seconds rather than guessing, and it became the reference point counsellors point them to.',
    image: '/work/kuccps-course-checker.webp',
    link: 'https://kuccpscoursechecker.vercel.app',
    linkText: 'Open the course checker',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'scidraft',
    title: 'SciDraft',
    summary:
      'Turns a lab manual and a set of raw results into a structured university science report.',
    problem:
      'Science students finish an experiment holding a manual and a page of readings, then lose entire evenings trying to work out what the numbers mean and how to arrange them into the report structure their department expects. The science is done; the writing is the bottleneck, and weak reports cost marks that the practical work already earned.',
    solution:
      'Built a drafting engine that takes the practical’s manual — matched against a library of stored manual templates by unit and year — together with the student’s own recorded results, and produces a structured draft: aim, procedure, observations, calculations, discussion and conclusion, written around the actual data rather than a generic template.',
    outcome:
      'Report writing collapsed from an evening to minutes, and students hand in work that is properly structured and actually reflects the results they recorded.',
    image: '/work/scidraft.webp',
    link: 'https://sci-draft.vercel.app/',
    linkText: 'Open SciDraft',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'tricret-parse',
    title: 'TricretParse',
    summary:
      'Rewrites a plain-English prompt into a structured JSON prompt, so AI output stops drifting.',
    problem:
      'People describe what they want to an AI in loose prose, and get loose results back — a detail dropped here, an instruction reinterpreted there. Prompting precisely means writing structured JSON by hand, which most people won’t do and shouldn’t have to.',
    solution:
      'Built a converter that reads a natural-language request and returns it as a properly structured JSON prompt, with an Advanced JSON mode for richer schemas and one-tap copy for pasting straight into any model.',
    outcome:
      'Non-technical users get the precision of structured prompting without writing a line of JSON, and the same prompt returns the same shape of answer every time.',
    image: '/work/tricret-parse.webp',
    link: 'https://prompt-to-json-seven.vercel.app/',
    linkText: 'Open TricretParse',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'pdf-tracking-system',
    title: 'PDF Contribution Tracking System',
    summary: 'A centralized contribution and balance management system for institutions.',
    problem:
      'Manual contribution tracking makes payments difficult to monitor, balances prone to errors, and financial records harder to audit.',
    solution:
      'Centralizes contribution records, balance calculations, user access, transaction history, reporting, and automated SMS notifications.',
    outcome:
      'Improves accuracy and accountability while significantly reducing the manual work required to track contributions and communicate balances.',
    image: '/work/pdf-tracking-system.webp',
    link: 'https://pdftrackingsystem.vercel.app',
    linkText: 'Open the tracking system',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },

  /* ------------------------------- Mobile apps ------------------------------ */
  {
    slug: 'my-bingwa',
    title: 'My Bingwa',
    summary:
      'An Android app for buying Safaricom data, minutes and SMS in a couple of taps.',
    problem:
      'Buying bundles meant remembering USSD strings or digging through a cluttered operator menu, and customers had no way to keep the offers they actually buy within reach. Every repeat purchase started from scratch.',
    solution:
      'Built a native app that groups everything into Data, Minutes, SMS and Special offers, surfaces a best-value deal on the home screen, lets customers favourite the bundles they buy most, and closes the purchase with M-Pesa — backed by an activity history and in-app help.',
    outcome:
      'Repeat purchases became a two-tap action, and the business gained a direct channel to its customers instead of competing inside the operator’s menu.',
    image: '/work/my-bingwa.webp',
    link: null,
    linkText: null,
    repo: 'private',
    category: 'Mobile Apps',
    status: 'private'
  },
  {
    slug: 'skylink-bingwa',
    title: 'Skylink Bingwa',
    summary:
      'A mobile platform that makes buying Safaricom bundles faster and easier for Skylink customers.',
    problem:
      'Customers had to navigate fragmented and inconvenient purchasing processes to buy airtime, data, minutes, and SMS.',
    solution:
      'Brings bundle discovery, selection, payment, and transaction tracking into one streamlined mobile experience — including airtime top-ups across networks, daily and Tunukiwa bundles, buying for another number, and an offline till fallback.',
    outcome:
      'Creates a faster purchasing journey, improves customer experience, and gives the business a scalable channel for bundle sales.',
    image: '/work/skylink-bingwa.webp',
    link: null,
    linkText: null,
    repo: 'private',
    category: 'Mobile Apps',
    status: 'private'
  },
  {
    slug: 'scope-sms',
    title: 'Scope SMS',
    summary:
      'An Android app that reads M-Pesa confirmations and answers bundle customers on its own.',
    problem:
      'Agents lose time and sales manually checking M-Pesa payments, matching amounts to bundles, and replying to customers.',
    solution:
      'Watches incoming M-Pesa confirmations on the phone itself, matches each transaction against bundle rules, and sends the right customer response automatically — with a daily view of payments seen, purchases confirmed, price lists sent and anything that failed to send.',
    outcome:
      'Reduces missed sales and repetitive work, allowing agents to process more payments while keeping customer communication accurate and personalized.',
    image: '/work/scope-sms.webp',
    link: null,
    linkText: null,
    repo: 'private',
    category: 'Mobile Apps',
    status: 'private'
  },
  {
    slug: 'phone-monitor',
    title: 'Phone Monitor',
    summary:
      'A private system for monitoring and controlling multiple Android phones from one computer.',
    problem:
      'Managing several phones individually is slow, fragmented, and difficult when real-time visibility or control is required.',
    solution:
      'Pairs an on-device agent with a desktop app over the local network, so several phones can be viewed and controlled from one interface with no cables and a two-step setup.',
    outcome:
      'Makes multi-device management significantly faster and gives users a centralized way to monitor and operate their phones.',
    image: '/work/phone-monitor.webp',
    link: 'https://github.com/wazimuautomate/Phone-monitor',
    linkText: 'View the repo',
    repo: 'public',
    category: 'Mobile Apps',
    status: 'private'
  },
  {
    slug: 'savelock',
    title: 'SaveLock',
    summary:
      'A savings-discipline application designed to help users stay consistent with daily M-Pesa saving goals.',
    problem:
      'People often struggle to maintain saving habits and can easily fall back into distracting phone usage instead of meeting their financial goals.',
    solution:
      'Sets daily saving deadlines, reminds users to pay, initiates M-Pesa payment prompts, and temporarily restricts selected distracting apps when deadlines are missed.',
    outcome:
      'Encourages consistent saving habits while helping users reduce distractions without permanently locking them out of their devices.',
    image: '/work/savelock.webp',
    link: 'https://github.com/wazimuautomate/SaveLock',
    linkText: 'View the repo',
    repo: 'public',
    category: 'Mobile Apps',
    status: 'private'
  },

  /* -------------------------------- Automation ------------------------------ */
  {
    slug: 'whatsapp-bundle-automation',
    title: 'WhatsApp Bundle Sale Automation',
    summary: 'A WhatsApp bot that sells data bundles and confirms M-Pesa payment end to end.',
    problem:
      'A business sold data bundles manually over WhatsApp — every order handled by hand, every payment confirmed by hand. Sales stopped whenever the owner was asleep or busy.',
    solution:
      'Developed a custom WhatsApp bot that lets customers buy bundles directly in chat, integrated with the business inventory system and with M-Pesa for payment, closing the sale end to end without a human.',
    outcome:
      'Selling continued around the clock, and hours of manual back-and-forth every day disappeared.',
    image: '/work/n8n-automation.webp',
    link: 'https://wa.me/254790295408?text=Bfasta',
    linkText: 'Try it on WhatsApp',
    repo: 'private',
    category: 'Automation',
    status: 'public'
  },
  {
    slug: 'order-to-dispatch-bot',
    title: 'Order-to-Dispatch Bot for Boutiques & Shops',
    summary:
      'A WhatsApp bot that takes the order, takes the money, updates stock and calls the rider.',
    problem:
      'Small shop owners take orders through WhatsApp and Instagram DMs by hand. They lose track of who has paid and who hasn’t, forget to update stock, oversell items they no longer have, and delay dispatch while they scroll back through M-Pesa messages to reconcile against a notebook.',
    solution:
      'A WhatsApp bot on WAHA/Evolution takes the order, checks live stock in Supabase, and sends an M-Pesa STK push. On payment confirmation the workflow updates stock, logs the order, and notifies both the owner and the rider on WhatsApp — no manual step anywhere in the chain.',
    outcome:
      'Zero missed orders, real-time stock accuracy, and the owner stops reconciling M-Pesa messages against a notebook.',
    image: '/work/n8n-automation.webp',
    link: null,
    linkText: null,
    repo: 'private',
    category: 'Automation',
    status: 'private'
  },
  {
    slug: 'rent-collection-system',
    title: 'Rent Collection & Reminder System',
    summary: 'Landlords stop chasing tenants — the system reminds, collects and reconciles.',
    problem:
      'Landlords with 5 to 30 units chase tenants for rent one phone call at a time, track payments in a notebook or a messy spreadsheet, and have no clear view of who is late until the month is already gone.',
    solution:
      'An n8n schedule sends WhatsApp reminders before the due date. The tenant pays by STK push or Paybill, the payment is logged automatically in Supabase against the right tenant and unit, and the landlord gets a WhatsApp and dashboard summary of paid versus outstanding.',
    outcome:
      'No more calling tenants individually, a live arrears list at any moment, and a visibly faster collection cycle.',
    image: '/work/n8n-automation.webp',
    link: null,
    linkText: null,
    repo: 'private',
    category: 'Automation',
    status: 'private'
  },
  {
    slug: 'restaurant-preorder-queue',
    title: 'Restaurant Pre-Order & Queue Killer',
    summary: 'Customers order and pay before they arrive; the kitchen works off a queue.',
    problem:
      'Lunch hour turns into a queue. Order slips reach the kitchen wrong or not at all, there is no way to pre-order, and walk-ins overwhelm staff at exactly the moment they can least absorb it.',
    solution:
      'A customer sends a keyword on WhatsApp or scans a QR, sees the menu, orders and pays by STK push. The ticket lands in the kitchen — printed or pushed to the kitchen phone on WhatsApp — and the customer is notified the moment the order is ready.',
    outcome:
      'Shorter queues, fewer wrong orders, and a kitchen working off a queue instead of shouted instructions.',
    image: '/work/n8n-automation.webp',
    link: null,
    linkText: null,
    repo: 'private',
    category: 'Automation',
    status: 'private'
  },
  {
    slug: 'duka-credit-tracker',
    title: 'Debt & Credit Sales Tracker for Dukas',
    summary: 'Credit sales logged from WhatsApp, chased automatically, summarised weekly.',
    problem:
      'Duka owners sell on credit to regulars and record it in an exercise book. Entries get missed, handwriting gets disputed, and real money is quietly written off because nobody can remember who took what.',
    solution:
      'The owner logs a credit sale in plain WhatsApp — "John, 200, sukari". n8n parses it and records it in Supabase against that customer, sends the customer an automated reminder near payday, and pushes the owner a weekly outstanding-debt summary.',
    outcome:
      'Debt becomes visible, fewer losses get written off, and nobody has to say "aki sikumbuki alichukua nini" again.',
    image: '/work/n8n-automation.webp',
    link: null,
    linkText: null,
    repo: 'private',
    category: 'Automation',
    status: 'private'
  },
  {
    slug: 'booking-reminder-system',
    title: 'Booking Reminder & No-Show Killer',
    summary:
      'Bookings taken on WhatsApp, checked against a real calendar, and reminded before they lapse.',
    problem:
      'Salons, barbers, garages and clinics take bookings by call or WhatsApp against a physical appointment book. No-shows are routine, double-bookings happen, and there is no reminder system to prevent either.',
    solution:
      'A WhatsApp booking flow checks the requested slot against a Supabase calendar, confirms it, and sends an automated reminder two hours before. No-shows get flagged, and repeat offenders can be required to pay a deposit by STK push before the slot is held.',
    outcome:
      'Fewer no-shows, no double-bookings, and the owner stops maintaining a paper appointment book.',
    image: '/work/n8n-automation.webp',
    link: null,
    linkText: null,
    repo: 'private',
    category: 'Automation',
    status: 'private'
  },
  {
    slug: 'whatsapp-ai-sales-agent',
    title: 'WhatsApp AI Sales Agent with M-Pesa Checkout',
    summary:
      'An AI sales agent that runs entirely inside WhatsApp — search a real catalogue, get a grounded recommendation, and pay by M-Pesa — with the owner SMS’d the moment a sale lands.',
    problem:
      'Small businesses sell over WhatsApp by hand — answering "do you have...", quoting prices, collecting delivery details across scattered messages, and sending M-Pesa links manually. It doesn’t scale past a handful of conversations at once, and putting a free-roaming LLM in front of it is worse: left to decide what happens next, it can invent a product that doesn’t exist, misquote a price, or claim a payment succeeded when it didn’t — a liability the moment the AI is one step from moving real money.',
    solution:
      'Built a deterministic state machine, not an autonomous agent: ten explicit conversation states in Postgres, one function as the sole writer of state, and the LLM used for exactly one job per message — classify intent and extract entities as strict JSON — never seeing a price, a total, or a payment outcome. Product search, stock and order totals come straight from the database through a four-tier search ladder, so the model can recommend but never invent. M-Pesa checkout is fully verified — signed STK push, callback verification, duplicate-payment protection, and a scheduled job that reconciles payments even when Safaricom’s callback never arrives. Credentials live in Supabase Vault, inbound webhooks are signature-verified, and 176 automated assertions across five test suites run before every deploy.',
    outcome:
      'A working demo takes a customer from "I need a laptop for programming" through product selection, delivery details, M-Pesa payment and confirmation, with the owner automatically SMS’d the order and receipt. Refactored from an earlier build that ran two conflicting AI agents across 11 workflows and 172 nodes — and had processed zero successful payments — down to 6 focused workflows with a single point of AI involvement, plus the payment-recovery safety net the original design lacked.',
    image: '/work/n8n-automation.webp',
    link: 'https://drive.google.com/file/d/1ameTD1tr2GS4D1jOzUbSvyFFEp7UHt6V/view',
    linkText: 'Watch the demo',
    repo: 'private',
    category: 'Automation',
    status: 'public'
  },

  /* --------------------------------- Websites ------------------------------- */
  {
    slug: 'white-barn',
    title: 'White Barn',
    summary: 'A premium scent and home-accent store, given the online presence it never had.',
    problem:
      'A premium physical store selling luxurious scents and curated home accents had zero online presence. Customers searching online could not find them — high-end branding existed offline, but digitally they were invisible.',
    solution:
      'Built a refined, conversion-focused website that reflects the brand’s elegance and lets customers discover products, explore collections, and connect directly.',
    outcome:
      'Established a premium digital presence and opened a sales channel that no longer depends on foot traffic.',
    image: '/work/white-barn.webp',
    link: 'https://white-barn.netlify.app',
    linkText: 'Open White Barn',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'bangin-hair-bk',
    title: 'Bangin Hair BK',
    summary: 'A Brooklyn salon whose reputation finally matches what people find online.',
    problem:
      'A salon known for masterful cuts and transformative colour had a strong word-of-mouth reputation but no digital presence. New clients could not preview services or validate credibility online.',
    solution:
      'Created a clean, visually expressive website showcasing services, style quality, and brand personality, so discovery and trust-building happen before the first call.',
    outcome:
      'Bookings now start online, and first-time clients arrive already convinced.',
    image: '/work/bangin-hair-bk.webp',
    link: 'https://banginhairbk.netlify.app',
    linkText: 'Open Bangin Hair BK',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'morning-glory-restaurant',
    title: 'Morning Glory Restaurant',
    summary: 'A restaurant with a local following, made findable to everyone searching for it.',
    problem:
      'A restaurant with a strong local reputation and unforgettable cuisine had no website. Visitors and tourists searching online had no official reference point, so reservations and walk-ins were quietly lost.',
    solution:
      'Developed a modern, mobile-first website presenting the menu, ambiance, and contact details clearly, so guests can decide and plan a visit without friction.',
    outcome:
      'Search traffic that used to go nowhere now lands on an official page and converts into visits.',
    image: '/work/morning-glory-restaurant.webp',
    link: 'https://morninggloryrestaurant.netlify.app',
    linkText: 'Open Morning Glory',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'polyclinique',
    title: 'Polyclinique',
    summary: 'A hospital’s services, departments, and care pathways made navigable online.',
    problem:
      'A large hospital serving Hammam-Lif since 2012 lacked a structured digital interface. Patients needed reliable access to information about services, departments, and care without inconvenience.',
    solution:
      'Built a structured medical website prioritising clarity, trust, and accessibility, organising services and essential information so patients can navigate care confidently.',
    outcome:
      'Patient onboarding got shorter and the hospital’s digital credibility now matches its clinical reputation.',
    image: '/work/polyclinique.webp',
    link: 'https://polyclinique.netlify.app',
    linkText: 'Open Polyclinique',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'garden-specialist-hospital',
    title: 'Garden Specialist Hospital',
    summary: 'A specialist healthcare provider given a platform that communicates authority.',
    problem:
      'A specialised healthcare provider needed a digital platform reflecting its excellence and professionalism. Without a structured website, patients had no centralised source of medical information.',
    solution:
      'Designed and implemented a clear, professional healthcare website that communicates specialisation and authority while guiding patients efficiently to the right service.',
    outcome:
      'Medical information now lives in one authoritative place, and patient acquisition no longer depends on referral alone.',
    image: '/work/garden-specialist-hospital.webp',
    link: 'https://gardenspecialist.netlify.app',
    linkText: 'Open Garden Specialist',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'lee-funeral-home',
    title: 'Lee Funeral Home',
    summary: 'A broken site rebuilt into a dependable support pathway for grieving families.',
    problem:
      'A long-established, premium funeral home had a non-functional WordPress website. In the moments when families needed immediate guidance, the digital system failed them.',
    solution:
      'Rebuilt and stabilised the website infrastructure and added structured service pathways — Immediate Support, Plan Ahead, Repatriation, and Cremation — so help is one click away.',
    outcome:
      'Families now reach the right guidance at any hour, without hitting a dead page.',
    image: '/work/lee-funeral-home.webp',
    link: 'https://leefuneralhome.netlify.app',
    linkText: 'Open Lee Funeral Home',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },
  {
    slug: 'valentine',
    title: 'Valentine',
    summary: 'A personalised way to send a declaration that outlives the moment.',
    problem:
      'Proposals and declarations of love default to the spoken word, and partners routinely underestimate the effort behind them. The gesture leaves nothing behind.',
    solution:
      'Built a site that lets people send personalised Valentine messages to the people they love, turning an ordinary declaration into something designed, unexpected, and keepable.',
    outcome:
      'Turned a fleeting moment into something the recipient can revisit — and share.',
    image: '/work/valentine.webp',
    link: 'https://be-my-valentine-wc.vercel.app/',
    linkText: 'Open Valentine',
    repo: 'private',
    category: 'Websites',
    status: 'public'
  },

  /* ------------------------------ Video editing ----------------------------- */
  {
    slug: 'lorem-productions',
    title: 'Lorem Productions',
    summary: 'A film company’s footage re-cut so the storytelling actually lands.',
    problem:
      'A film production company had low social media engagement caused by weak editing structure and inconsistent video quality.',
    solution:
      'Re-edited and restructured their visual content, tightening pacing, clarity, and story rhythm so each piece holds attention to the end.',
    outcome:
      'Engagement climbed and the brand started reading as professional rather than promising.',
    image: '/work/lorem-productions.webp',
    link: 'https://youtu.be/lGw6ix1Mydk?si=uzJjdWEUs8vOoqtf',
    linkText: 'Watch the edit',
    repo: 'private',
    category: 'Video Editing',
    status: 'public'
  },

  /* --------------------------------- Design --------------------------------- */
  {
    slug: 'tech-haven',
    title: 'Tech Haven',
    summary: 'A brand identity that separates a premium cyber cafe from the budget shops.',
    problem:
      'A high-end cyber cafe was undermined by weak brand visibility. Without a recognisable identity, walk-ins could not tell it apart from the budget shops around it.',
    solution:
      'Designed a distinctive logo and identity system, applied consistently across signage, merchandise, and digital touchpoints.',
    outcome:
      'The space now reads as premium before anyone walks in, and attracts the clientele that matches its pricing.',
    image: '/work/tech-haven.webp',
    link: 'https://drive.google.com/file/d/1GdAphvWmDZHAMyx5yJn13YKZ8NyE73pT/',
    linkText: 'View the identity',
    repo: 'private',
    category: 'Design',
    status: 'public'
  },
  {
    slug: 'kenya-learn-academy-brand-kit',
    title: 'Kenya Learn Academy — Brand Kit',
    summary: 'A full brand kit so an education brand stops improvising its own look.',
    problem:
      'Kenya Learn Academy was producing materials one at a time, each with a different green, a different typeface and a different logo treatment. Nothing looked like it came from the same institution, which is fatal for an education brand selling credibility.',
    solution:
      'Built a complete brand kit — logo system, colour palette anchored on the deep academic green, typography hierarchy and usage rules — packaged so anyone on the team can produce on-brand material without a designer.',
    outcome:
      'Every piece the academy publishes now reads as one institution, and new material ships without a design bottleneck.',
    image: '/work/design/kenya-learn-academy-brand-kit.webp',
    link: 'https://drive.google.com/file/d/1-K7HIRQoyre9r2BYQj98WdmTdbIKCj7X/view',
    linkText: 'View the brand kit',
    repo: 'private',
    category: 'Design',
    status: 'public'
  },
  {
    slug: 'skylink-5k-downloads',
    title: 'Skylink — 5K Downloads Milestone',
    summary: 'A milestone turned into proof, instead of a number nobody sees.',
    problem:
      'Skylink Technologies hit 5,000 app downloads — the strongest trust signal they had — and it was sitting unused in an analytics dashboard where no customer would ever see it.',
    solution:
      'Designed a high-energy thank-you poster built around the number itself: stacked oversized 5Ks, the brand’s orange, a cut-out celebratory subject, and a service strip listing Bingwa data, airtime, agent portal and SMS API along the base.',
    outcome:
      'A private metric became public social proof, and the milestone did marketing work instead of sitting in a dashboard.',
    image: '/work/design/skylink-5k-downloads.webp',
    link: 'https://drive.google.com/file/d/18nPnOPXBXUbIBp5R8oCBCEAmVak4HS1n/view',
    linkText: 'View the poster',
    repo: 'private',
    category: 'Design',
    status: 'public'
  },
  {
    slug: 'kisii-university-festive-card',
    title: 'Kisii University — Festive Card',
    summary: 'A student leader’s seasonal greeting, designed to represent an institution.',
    problem:
      'A student congress representative needed to send a Christmas and New Year message to his faculty. A plain text post carries no authority, and an off-the-shelf card would not carry the university’s identity or his office.',
    solution:
      'Designed a festive card that keeps the institution’s crest, name and domain properly weighted at the top, places the representative’s portrait and title against a seasonal treatment, and holds the university motto strip along the base.',
    outcome:
      'The greeting landed as an official communication from the office rather than a personal post.',
    image: '/work/design/kisii-university-festive-card.webp',
    link: 'https://drive.google.com/file/d/19Drg2LY9ODyBmT2Hj5LiokQ0lnGJicBj/view',
    linkText: 'View the card',
    repo: 'private',
    category: 'Design',
    status: 'public'
  },
  {
    slug: 'skylink-paybill-guide',
    title: 'Skylink — Buy For Another Number Guide',
    summary: 'One poster that answers the question support was answering all day.',
    problem:
      'Customers kept asking the same thing: how do I buy a bundle for someone else’s number? Every instance was answered by hand in chat, with the Paybill and account details retyped each time and mistyped often enough to cost transactions.',
    solution:
      'Designed a single-purpose instruction poster that puts the Paybill business number and the account-number rule in large, unmistakable blocks, with the once-a-day limit and the support line held below.',
    outcome:
      'Support stopped retyping the same instructions, and failed transactions from wrong account numbers dropped.',
    image: '/work/design/skylink-paybill-guide.webp',
    link: 'https://drive.google.com/file/d/1E-fqjJ4PTO-wWOI0ON_dOicyvlpw8H9x/view',
    linkText: 'View the guide',
    repo: 'private',
    category: 'Design',
    status: 'public'
  },
  {
    slug: 'skylink-best-offers',
    title: 'Skylink — Best Offers Price List',
    summary: 'Twenty-plus bundle prices made scannable in a single glance.',
    problem:
      'A bundle business lives on its price list, and Skylink’s ran to more than twenty offers across data, minutes and SMS. As plain text it was unreadable on a phone, so customers asked the price instead of reading it.',
    solution:
      'Designed a colour-blocked price list — data in one field, minutes and SMS in another — so a customer’s eye lands on the right category first and the price second, with the Lipa na M-Pesa till and Play Store badge closing it out.',
    outcome:
      'Customers self-serve the price they need, and the list became the asset agents forward instead of typing offers out.',
    image: '/work/design/skylink-best-offers.webp',
    link: 'https://drive.google.com/file/d/1L-UwuKxXZbUZMHi1pP9xlgfmRpnPfrlj/view',
    linkText: 'View the price list',
    repo: 'private',
    category: 'Design',
    status: 'public'
  },
  {
    slug: 'lorem-technologies-bundles',
    title: 'Lorem Technologies — Bundle Offer',
    summary: 'A clean offer poster for a reseller competing on one hook.',
    problem:
      'Lorem Technologies had one thing that genuinely set them apart — you can buy even with an unpaid Okoa Jahazi — and it was buried in a wall of prices where nobody read it.',
    solution:
      'Designed a poster that leads with the bundle prices in a single readable card, then gives the Okoa Jahazi hook its own highlighted "Best Part!" block above the till number so it cannot be skimmed past.',
    outcome:
      'The differentiator stopped being a footnote and started being the reason customers chose them.',
    image: '/work/design/lorem-technologies-bundles.webp',
    link: 'https://drive.google.com/file/d/1P7wZUvwwe_YQGgQmcu36bX9Kof2dSez5/view',
    linkText: 'View the poster',
    repo: 'private',
    category: 'Design',
    status: 'public'
  },
  {
    slug: 'bingwa-sokoni-price-list',
    title: 'Bingwa Sokoni — Full Price List',
    summary: 'A twenty-line catalogue and a how-to-pay flow on one page.',
    problem:
      'Bingwa Sokoni’s catalogue ran to roughly twenty bundles plus SMS and minutes, and customers also needed telling how to pay. Two separate messages meant half of them dropped out between the price and the payment.',
    solution:
      'Designed a single sheet that splits data from SMS and minutes into two colour-blocked columns, gives Lipa na M-Pesa its own anchored panel, and runs the step-by-step payment flow and support numbers along the base.',
    outcome:
      'Price and payment arrive in one forward, and customers complete the purchase without a second message.',
    image: '/work/design/bingwa-sokoni-price-list.webp',
    link: 'https://drive.google.com/file/d/1Qah8WghkTcS2SpEy056FxWzOZ7915hhh/view',
    linkText: 'View the price list',
    repo: 'private',
    category: 'Design',
    status: 'public'
  },
  {
    slug: 'lorem-production-notice',
    title: 'Lorem Production — Client Notice',
    summary: 'An operational notice that protects a brand instead of denting it.',
    problem:
      'A production company going on break had to tell clients they would be unreachable. Sent as a plain message it reads as unprofessional, or worse, as a company quietly going dark.',
    solution:
      'Designed a branded notice card carrying the studio’s crest, a clear "Attention" heading, the message in a single unambiguous line, and a signed-off close from the team.',
    outcome:
      'The break read as a planned, professional communication, and the brand kept its footing while nobody was at the desk.',
    image: '/work/design/lorem-production-notice.webp',
    link: 'https://drive.google.com/file/d/1Var2ONEVNOrWV_igxGwFQnQIXIbCrBrk/view',
    linkText: 'View the notice',
    repo: 'private',
    category: 'Design',
    status: 'public'
  },
  {
    slug: 'skylink-bundles-prime',
    title: 'Skylink Bundles Prime',
    summary: 'A three-offer poster built for people who will not read twenty.',
    problem:
      'The full price list works for customers who are shopping, but most people scrolling past will not read twenty lines. Skylink needed a version that converts in the two seconds a feed gives it.',
    solution:
      'Designed a cut-down poster carrying only the three best-selling bundles, the discount flash, and a numbered how-to-buy block with the till repeated in the largest type on the page.',
    outcome:
      'A feed-ready version that converts on a glance, running alongside the full list rather than replacing it.',
    image: '/work/design/skylink-bundles-prime.webp',
    link: 'https://drive.google.com/file/d/1a4Tf5XTljKYXjY5NvAgCgnNZtwrltBOT/view',
    linkText: 'View the poster',
    repo: 'private',
    category: 'Design',
    status: 'public'
  },
  {
    slug: 'design-bootcamp-flyer',
    title: 'Graphic Design Bootcamp — Launch Flyer',
    summary: 'A course launch flyer engineered around scarcity, not description.',
    problem:
      'A five-day design bootcamp was competing for attention against every other online course, and describing the curriculum in a flyer persuades nobody to act today rather than next week.',
    solution:
      'Designed a flyer that leads with the offer, not the syllabus: the course name in heavy type, then a single yellow disc holding the price, a 72-hour countdown and the remaining-slots count, with the sign-up URL as the only other element.',
    outcome:
      'The flyer created a reason to act immediately, and sign-ups concentrated inside the deal window rather than trailing off.',
    image: '/work/design/design-bootcamp-flyer.webp',
    link: 'https://drive.google.com/file/d/1bSPPXa_QrW8UDCFImyaHdA21ITkq7GIV/view',
    linkText: 'View the flyer',
    repo: 'private',
    category: 'Design',
    status: 'public'
  },
  {
    slug: 'blaze-bulk-sms',
    title: 'Blaze Tech Scope — Bulk SMS',
    summary: 'A service poster that shows the product working, not just described.',
    problem:
      'Bulk SMS is invisible as a product. Explaining "we send messages for businesses" persuades nobody, and the price per SMS — the actual reason to switch — was getting lost in prose.',
    solution:
      'Designed a poster built around a phone mockup showing a real delivered message, with instant delivery, the per-SMS price and automation stated as three scannable claims, and the POST/GET SMS API called out below for the developer audience.',
    outcome:
      'One asset that sells to business owners and developers at once, with the price doing the persuading.',
    image: '/work/design/blaze-bulk-sms.webp',
    link: 'https://drive.google.com/file/d/1l_uRvQ78tbgxQcidByTyjjK5xn77NNMu/view',
    linkText: 'View the poster',
    repo: 'private',
    category: 'Design',
    status: 'public'
  },
  {
    slug: 'duka-online-stores',
    title: 'Duka Online Stores — Launch Poster',
    summary: 'A platform launch poster that makes an abstract product tangible.',
    problem:
      'Duka Online Stores sells shop owners something they cannot picture: an online store. A screenshot means nothing to a trader, and a feature list reads like software jargon.',
    solution:
      'Designed a poster that puts an entire inventory — electronics, clothing, groceries, footwear — physically on the page, so the offer reads as "your stock, online". The free-website hook sits under it, with six capabilities as ticked pairs and the URL anchoring the base.',
    outcome:
      'Shop owners saw their own stock in the offer, and the pitch stopped needing an explanation.',
    image: '/work/design/duka-online-stores.webp',
    link: 'https://drive.google.com/file/d/1mczi1cHdBjG49Aof0PqJkouxytWZfBKW/view',
    linkText: 'View the poster',
    repo: 'private',
    category: 'Design',
    status: 'public'
  },
  {
    slug: 'skylink-amazing-bundles',
    title: 'Skylink — Amazing Bundles',
    summary: 'The brand-led cut of the offer, for channels the price list is too loud for.',
    problem:
      'Skylink’s high-contrast price posters convert in a feed but overwhelm the brand. On channels where the company is introducing itself rather than closing a sale, they read as noise.',
    solution:
      'Designed a restrained variant on the brand’s deep green: logo and name given room at the top, the Okoa Jahazi hook stated once, and the seven headline bundles held in a single white card beside the Play Store badge and till.',
    outcome:
      'A brand-led version of the same offer, so Skylink can lead with identity where the loud cut would cost them credibility.',
    image: '/work/design/skylink-amazing-bundles.webp',
    link: 'https://drive.google.com/file/d/1pk807pIa13Xx1n99NxaIBFKQaXAuRsY0/view',
    linkText: 'View the poster',
    repo: 'private',
    category: 'Design',
    status: 'public'
  },
  {
    slug: 'skylink-hotel',
    title: 'Skylink Hotel',
    summary: 'A menu redesigned so guests can decide at a glance.',
    problem:
      'A well-known hotel in Kisii lacked a well-designed menu to present its food and services. Guests could not scan the offering quickly, which slowed ordering and blunted the brand.',
    solution:
      'Designed a visually appealing, easy-to-scan menu that highlights the hotel’s distinctive offerings and lets guests find what they want immediately.',
    outcome:
      'Ordering got faster and the menu now works as a piece of branding rather than a price list.',
    image: '/work/skylink-hotel.webp',
    link: 'https://drive.google.com/file/d/1qAhlf3zXhbb40ijD45fiTJrHvUs8nEuk/',
    linkText: 'View the menu',
    repo: 'private',
    category: 'Design',
    status: 'public'
  }
];

export const problemCount = solvedProblems.length;
export const liveSystemCount = solvedProblems.filter((p) => p.status === 'public').length;

export const findProblem = (slug: string) => solvedProblems.find((p) => p.slug === slug);
