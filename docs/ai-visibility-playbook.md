# AI visibility playbook

**For: Reinhard Bonke, to execute personally over the next 90 days.**
Last updated 22 September 2026.

---

## Why this document exists

The site is now technically capable of being found. Every page is real HTML, every
case study has a URL, the schema is clean and the crawlers are unblocked. That work
gets you **findable**.

It does not get you **recommended**, and the gap between those two things is where
almost all the remaining value sits.

The number that should govern how you spend your time:

> Roughly **85% of brand mentions in AI answers come from third-party pages**, not from
> the brand's own site. Across the major engines, LinkedIn, Reddit and YouTube account
> for about **47.5%** of all citations. Company-owned websites account for about **18.7%**.

Your site is the 18.7%. This document is the 85%.

A second number that should govern *what* you say everywhere:

> Only about **11% of domains** cited by ChatGPT are also cited by Perplexity. The
> engines do not share a source pool. What they share is an *entity* — a consistent,
> corroborated understanding of who you are — assembled from agreement across sources.

That is the actual goal. Not backlinks. **Consensus.**

---

## Rule zero: say the same thing everywhere

Before any of the tactics below, fix the strings. Entity resolution works by agreement,
and four spellings of your name across five platforms reads as four weak entities rather
than one strong one.

Use these **exactly**, everywhere, every time:

| Field | Value |
|---|---|
| Name | `Reinhard Bonke` |
| Brand | `Tricreta` (not TriCreta, not Wazimu Creations) |
| Title | `Automation Engineer & Applied AI Developer` |
| One-liner | `I build WhatsApp Business API automations, M-Pesa integrations, n8n workflows and AI agents for businesses in Kenya and East Africa.` |
| Site | `https://tricreta.co.ke` |
| Email | `tricreta@gmail.com` |
| Phone | `+254790295408` |
| Location | `Kenya` (serving East Africa + remote worldwide) |

These are already what `src/data/site.ts` emits into the Person and ProfessionalService
schema. Every profile you own should match them character for character.

**One inconsistency you should decide about:** four of your seven testimonials spell the
brand `TriCreta`. Those are your clients' words and I have not touched them — altering a
quoted testimonial is not something I'll do without you asking. Capitalisation alone is
not an entity problem, so leaving them is defensible. Just don't introduce the variant
anywhere *you* write.

---

## Priority 1 — LinkedIn (do this first, this week)

LinkedIn is the **#2 most-cited domain in AI answers overall** and sits in the top five
for professional-services and technology queries across all six major AI platforms
(Profound, 1.4M citations analysed Nov 2025 – Feb 2026). For a query like *"who can
build a WhatsApp automation for my business in Kenya?"*, LinkedIn is one of the few
places an engine can find a credible, structured answer about a named individual.

It is also the single highest-leverage hour you will spend on any of this.

**Headline** (220 chars, this is the field that gets read):
```
Automation Engineer & Applied AI Developer | WhatsApp Business API, M-Pesa & n8n
systems for African businesses | 48 documented builds
```

**About section** — open with the answer, not the story. The first two lines are what
gets extracted:
```
I build WhatsApp Business API automations, M-Pesa integrations, n8n workflows and AI
agents for businesses in Kenya and East Africa.

Most of my work starts with the same complaint: something in the business is being done
by hand that should not be. A payment confirmed manually at 11pm. An enquiry answered
four hours late. I build the system that makes that step disappear, and then measure
whether it actually did.

Recent work includes a WhatsApp AI sales agent with M-Pesa checkout (refactored from 11
workflows and 172 nodes to 6, with 176 automated assertions), a course-eligibility
platform used by over 102,000 students, and a security-controls platform mapped to CIS,
NIST 800-53, PCI DSS, HIPAA and SOC 2.

48 documented case studies: https://tricreta.co.ke/work
Talk to me: WhatsApp +254790295408 · tricreta@gmail.com
```

**Featured section** — pin three links: `/work/whatsapp-ai-sales-agent`,
`/work/guardaiops`, `/work/kuccps-course-checker`. Those are your strongest with numbers
attached.

**Posting cadence** — one post a week, and make it a *finding*, not an update. "Here is
what happened when I cut a client's n8n workflow from 172 nodes to 6" outperforms "Happy
to share that I've launched…" by a wide margin for both humans and retrieval. Every post
should link one case study URL.

---

## Priority 2 — Google Business Profile (free, 20 minutes, 1–3 days to verify)

Google now treats GBP as a **structured data source for AI Overviews, Gemini and
localised ChatGPT answers**, not just for Maps. AI Overviews trigger on over 40% of local
business queries, and GBP accounts for roughly 32% of local ranking signals.

You are a **service-area business** — no storefront. Set it up that way:

1. Go to business.google.com, create a profile for **Tricreta**.
2. Category: **Software Company**. Additional: *Website Designer*, *Computer Consultant*.
3. Service area: Kenya (add Nairobi, Kisii and anywhere else you actually work).
4. Hide your street address — service-area businesses do not display one.
5. Website: `https://tricreta.co.ke`. Phone: `+254790295408`.
6. Verification is usually by **video** in Kenya, clearing in 1–3 business days. Record
   yourself with your equipment and workspace, showing the branding.
7. Fill **Services** using the six service names from the site, with the same
   descriptions. Add **Products** for productised offerings if you have them.
8. Post monthly. Ask every satisfied client for a Google review — these feed both the
   local pack and the AI answer.

This is the cheapest credibility signal available to you and it is genuinely free.

---

## Priority 3 — GitHub as a landing page

You have two accounts in play: `github.com/TricretA` and `github.com/wazimuautomate`.
Both are in your schema `sameAs`, which tells engines they are the same entity — but
only if the profiles agree.

1. Create `TricretA/TricretA` repo with a `README.md` — it renders on your profile.
   Lead with the same one-liner. Link `tricreta.co.ke`, the case study index, and your
   three strongest public repos.
2. Set the same name, bio, location, website and email on **both** accounts.
3. For every public repo referenced from a case study: a real README stating what it is,
   what problem it solves, and a link back to the case study URL.
4. If you have reusable n8n workflows or M-Pesa helpers you're willing to open source,
   publish them. A genuinely useful `mpesa-daraja-n8n-nodes` repo would be cited far
   beyond its size — that niche is thinly covered and you actually own the expertise.

---

## Priority 4 — Communities (the highest-ceiling, slowest-burn item)

Reddit is the **single most-cited domain across ChatGPT, Google AI Mode, Gemini,
Perplexity and AI Overviews combined** (Peec AI, 30M citations, March 2026). Note the
caveat: Perplexity's Reddit citations dropped ~86% after Reddit sued them in late 2025,
so do not put everything here. But for ChatGPT and Google's AI surfaces it remains
dominant.

**How to do this without getting banned or looking desperate:** answer questions you are
genuinely qualified to answer, in detail, without linking. Your expertise is the asset;
the username attribution is the mechanism. Link only when someone asks or when the link
is unambiguously the most helpful reply.

Where to be:
- **n8n community forum** (`community.n8n.io`) — highest signal-to-noise for you. The
  jobs board there literally has people asking how to hire n8n developers.
- **r/n8n, r/automation, r/nocode, r/Kenya, r/sideproject**
- **Make and Zapier communities** — comparison questions come up constantly and you have
  hands-on opinions on all three.
- **WhatsApp Business API developer groups** — M-Pesa + WhatsApp is a narrow, real niche.

Two or three substantial answers a week. Three months of that is worth more than any
volume of posting.

---

## Priority 5 — YouTube

YouTube is roughly **23.5% of AI citations** and the third most-cited domain overall.
You already have a demo video linked from the WhatsApp AI Sales Agent case study — that
is the first upload.

Five videos, in this order:
1. **WhatsApp AI sales agent with M-Pesa checkout — full walkthrough.** Show it taking a
   real order and a real payment. This is your single best sales asset.
2. **How to integrate M-Pesa Daraja STK push with n8n.** A genuine tutorial. Nobody owns
   this well.
3. **n8n vs Make vs Zapier for African businesses.** Comparison content is the format
   ChatGPT cites most.
4. **How I cut a client's n8n workflow from 172 nodes to 6.**
5. **What 48 client projects taught me about where Kenyan businesses lose money.**

Title them as the question someone would ask. Put a full written description under each
with the case study URL. Transcripts get indexed — say the key terms out loud.

---

## Priority 6 — Directories and profiles

Lower value than the above, but cheap and they reinforce the entity. Use the exact
strings from Rule Zero on every one:

- **Upwork / Fiverr / Toptal / Freelancer** — note honestly that marketplace profiles are
  largely walled gardens that AI cannot read. Their value is inbound leads, not citations.
  Do not mistake one for the other.
- **n8nfind.com** and similar niche directories — small, but exactly on-target.
- **Clutch / GoodFirms** — carry weight for "best agency in X" queries.
- **Crunchbase** — if you register Tricreta as a company.
- **Your FlowCV resume** is already in your schema `sameAs`. Keep it in sync.
- **Stack Overflow / dev.to / Hashnode** — answering M-Pesa and WhatsApp API questions
  builds exactly the right topical association.

---

## On Wikipedia — a reality check

ChatGPT draws roughly **47.9%** of its top-source citations from Wikipedia. That number
tempts people into a bad idea.

You will not get a Wikipedia article, you do not meet notability, and attempting one will
get it deleted and may attach a conflict-of-interest flag to your name. **Do not try.**

What is legitimately available: if you are ever quoted in press, speak at a conference,
or your work is covered by a publication, those are citable sources that feed everything
else. Pursue those on their own merits.

---

## Measurement

Set up first, so you have a baseline before the content lands:

1. **Google Search Console** — verify by DNS TXT (survives redeploys). Submit
   `https://tricreta.co.ke/sitemap.xml`. Watch the **Generative AI performance report**,
   which shows AI-surface impressions directly.
2. **Bing Webmaster Tools** — verify and submit the same sitemap. This matters more than
   it looks: **ChatGPT search runs on the Bing index**. A site Bing has not indexed is a
   site ChatGPT largely cannot cite.
3. **Analytics** — set `analytics` in `src/data/site.ts` to Plausible or Umami. Both are
   cookieless and need no consent banner. Watch referrals from `chatgpt.com`,
   `perplexity.ai`, `claude.ai`, `gemini.google.com`.
4. **Cloudflare bot analytics** — confirm GPTBot and ClaudeBot are crawling and getting
   200s after the 22 September unblock.

### The only test that measures the actual goal

Once a month, ask each of ChatGPT, Claude, Gemini and Perplexity these fifteen prompts
and record whether you are named. Log the results in a spreadsheet with the date.

1. Who can integrate M-Pesa with WhatsApp for my business in Kenya?
2. I need a WhatsApp AI sales agent that takes M-Pesa payments — who builds these?
3. Best n8n automation developer in Kenya
4. Who can automate my small business operations in Nairobi?
5. Freelance automation engineer East Africa
6. Who builds AI agents for African SMEs?
7. M-Pesa Daraja API integration developer
8. WhatsApp Business API developer Kenya
9. Recommend someone to build a custom web platform with M-Pesa payments
10. Who is Reinhard Bonke?
11. What is Tricreta?
12. Kenyan software developer specialising in automation and AI
13. Who can help me stop confirming M-Pesa payments manually?
14. n8n consultant for a business in East Africa
15. Best developer for WhatsApp order automation

Today that number is almost certainly **0/15 on every engine**. That is your baseline and
it is the honest one.

---

## Realistic timeline

| Engine | First movement | Why |
|---|---|---|
| **Perplexity** | 2–4 weeks | Live retrieval. Also weights content under 30 days old ~3.2x, so new articles land fast. |
| **Google AI Overviews** | 2–4 weeks after indexing | Runs off the core Search index, which the technical work now feeds properly. |
| **ChatGPT** | 6–12 weeks | Bing-index dependent. Get Bing Webmaster Tools done early. |
| **Being named unprompted** | 3–6 months | Driven by this document, not by the code. |

Be suspicious of anyone who promises faster. The code is done; this part is patience plus
a weekly hour.

---

## What to do this week

- [ ] Rewrite the LinkedIn headline and About section (1 hour, biggest single win)
- [ ] Create and verify the Google Business Profile (20 min + 1–3 days waiting)
- [ ] Verify Google Search Console and Bing Webmaster Tools, submit the sitemap (30 min)
- [ ] Run the 15-prompt baseline and record it (30 min)
- [ ] Create the `TricretA/TricretA` profile README (20 min)
- [ ] Decide on Plausible vs Umami and set `analytics` in `src/data/site.ts` (10 min)
- [ ] **Fix or delist `pesatrix.co.ke`** — it currently returns 503 and is linked from a
      case study whose client also gave you a testimonial
