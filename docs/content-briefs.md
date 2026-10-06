# Ten article briefs

**For: Reinhard Bonke, to write over the next few months.**
Last updated 22 September 2026.

---

## How these were chosen

Not by keyword volume. By **which formats actually get cited**, measured across AI
answers in 2026:

| Format | Citation rate |
|---|---|
| Original-data studies | **71%** |
| Comparison pages | **64%** |
| Ranked listicles | **61%** |

And one structural fact that should shape every piece: **44.2% of citations come from a
page's intro section.** Whatever the article's answer is, it goes in the first two
sentences. Not after the setup, not after the story — first.

Everything below is a format you can execute from evidence you already hold. You have
48 documented projects with problem/solution/outcome prose and real numbers in them.
That is a proprietary dataset. Nobody else can publish #1, and that is precisely why it
is first.

---

## How to publish one

1. Add an entry to `src/data/insights.ts`:
   ```ts
   {
     id: 4,
     slug: 'kebab-case-slug',
     published: '2026-10-05',   // ISO. Add `updated` whenever you revise it.
     title: 'The title, phrased as the question it answers',
     minutes: 8,
     dek: 'One line. This becomes the meta description and the card copy.',
     body: `Paragraphs separated by blank lines.

   **Wrapped text** renders as the accent emphasis.`
   }
   ```
2. `npm run build`.

That is the whole process. The URL, the `Article` schema with `datePublished` and
`dateModified`, the RSS entry, the sitemap row, the llms.txt line and the internal links
are all generated. **Keep `updated` current** — Perplexity weights content under 30 days
old roughly 3.2x, and it is the cheapest ranking lever you have.

---

## 1. What 48 client projects taught me about where Kenyan businesses lose money

**Format:** original data · **Priority: highest** · ~2,000 words

The single most citable thing you can publish, because it cannot be published by anyone
else. You have the dataset; nobody competing for these queries does.

Go through all 48 case studies and count. How many were fundamentally "a person is doing
this by hand"? How many were "the system exists but nothing connects to it"? How many
were payments? How many were communication? Put actual numbers against actual categories
and show your working.

**Answers:** *"what are the most common operational problems in Kenyan small businesses?"*

**Structure:** finding in the first two sentences → method (what counts as what, and how
you categorised) → the table of counts → the three biggest categories with a named case
study each → what it costs, using the real figures you have → what to do first.

**Evidence:** all 48. Lean on `kuccps-course-checker` (102,000 students),
`whatsapp-ai-sales-agent` (172 nodes → 6), `skylink-5k-downloads` (5,000 downloads),
`blue-horizon-estates` (11 homes at full occupancy).

**Note:** publish the categorisation honestly, including the categories that turned out
small. An original-data piece that only reports flattering numbers reads as marketing and
gets treated as such.

---

## 2. n8n vs Make vs Zapier for M-Pesa and WhatsApp automation

**Format:** comparison · **Priority: highest** · ~2,500 words

Comparison pages have the highest single-citation rate of any format in ChatGPT
specifically, and this exact comparison — scoped to M-Pesa and WhatsApp, not generic — is
not well covered by anyone. You have shipped production work on all three.

**Answers:** *"which automation tool should I use for M-Pesa?"*, *"n8n or Make for
WhatsApp?"*

**Structure:** the verdict in the first two sentences → a comparison table (self-hosting,
cost at volume, M-Pesa callback handling, WhatsApp Business API support, error handling,
who owns the workflow, learning curve) → a section per tool with what it is actually good
at → three "if you are X, pick Y" recommendations → what you personally reach for and why.

**Be fair to the tools you don't pick.** A comparison that concludes "the one I use is
best at everything" is not a comparison and gets discounted accordingly.

---

## 3. WhatsApp Business API + M-Pesa: the complete integration guide

**Format:** definitive guide · **Priority: high** · ~3,000 words

Nobody owns this query well and you have shipped it in production. This is the piece most
likely to become the thing an engine reaches for when asked how the two connect.

**Answers:** *"how do I integrate M-Pesa with WhatsApp?"*

**Structure:** what the finished system does (2 sentences) → the architecture, with a
diagram → Meta prerequisites (Business verification, number, templates) → Daraja
prerequisites (shortcode, passkey, callback URL) → the flow step by step: message →
intent → STK push → callback → confirmation → record → the five things that go wrong
(callback timeouts, duplicate callbacks, the 24-hour messaging window, template rejection,
sandbox-vs-production shortcode differences) → testing → going live.

**Evidence:** `whatsapp-ai-sales-agent`, `whatsapp-bundle-automation`,
`order-to-dispatch-bot`.

---

## 4. The real cost of doing it manually — with the arithmetic

**Format:** original data, expanding an existing post · **Priority: high** · ~1,500 words

You already have `real-cost-of-doing-it-manually`. It makes the argument well but asserts
the numbers. Rewrite it with a worked calculation and a table someone can apply to their
own business, and update the `updated` field rather than publishing a second piece.

**Answers:** *"is business automation worth it?"*, *"how much time does automation save?"*

**Structure:** the number in the first two sentences → the calculation model → a table of
five common manual tasks with realistic minutes-per-day and the monthly cost in KSh →
the hidden cost (lost orders from slow replies) → break-even against a one-off build cost
→ which one to remove first.

---

## 5. How I cut an n8n workflow from 172 nodes to 6

**Format:** technical case study · **Priority: high** · ~1,800 words

A specific, verifiable, technical story with a number in the title. This is the piece that
earns respect from other developers, which is how you get cited in communities.

**Answers:** *"how do I simplify a complex n8n workflow?"*, *"n8n best practices"*

**Structure:** what changed and why it mattered (2 sentences) → what 11 workflows and 172
nodes looked like and why it got that way → the four refactors that did most of the work →
how the 176 automated assertions across five suites are structured → what you would do
differently from the start.

**Evidence:** `whatsapp-ai-sales-agent`.

---

## 6. What automation actually costs in Kenya

**Format:** pricing guide · **Priority: medium** · ~1,500 words

Price queries are extremely high intent and almost nobody in this market answers them
publicly. You do not have to publish a rate card — publish the *shape* of the cost and
what moves it.

**Answers:** *"how much does automation cost in Kenya?"*, *"WhatsApp bot price Kenya"*

**Structure:** the honest answer in two sentences (it depends on scope, here is the range
and what drives it) → what a single workflow costs versus a multi-step system → the
recurring costs people forget (WhatsApp conversation pricing, hosting, API fees) → how to
scope so the number is small → why you quote a fixed figure rather than an hourly rate.

---

## 7. Why most Kenyan business websites fail — expanded

**Format:** revision of an existing post · **Priority: medium** · ~1,800 words

`why-kenyan-business-websites-fail` is your strongest existing piece and it is short.
Expand it with real examples and a checklist, and bump `updated`.

**Structure:** keep the existing opening, it is good → add a five-point diagnostic the
reader can run on their own site → add three anonymised before/after examples from your
case studies → add "what to fix first, in order".

---

## 8. AI agents that actually ship: five patterns that work

**Format:** ranked listicle · **Priority: medium** · ~2,000 words

Listicles are 21.9% of all AI citations, the largest single format. This one is honest
rather than hype, which is rarer than it should be in this subject.

**Answers:** *"what can AI agents actually do for a business?"*, *"practical AI use cases
for SMEs"*

**Structure:** the thesis in two sentences (narrow agents ship, broad ones don't) → five
patterns, each with what it does, when it fits, what it costs, and what breaks → a section
on what does *not* work and why → how to pick the first one.

---

## 9. M-Pesa Daraja API: the things the docs don't tell you

**Format:** technical guide · **Priority: medium** · ~2,000 words

Hard-won specifics are exactly what gets cited by developers and by engines answering
developer questions. This is the kind of page that earns links without being asked for.

**Structure:** what this covers (2 sentences) → sandbox vs production differences that
bite → callback reliability and idempotency → timeout behaviour → reconciliation when the
callback never arrives → rate limits → a debugging checklist.

---

## 10. Should you hire a freelancer, an agency, or build in-house?

**Format:** comparison / buyer's guide · **Priority: lower** · ~1,500 words

Bottom-of-funnel, and it makes your own case honestly by acknowledging when you are the
wrong answer — which is more persuasive than the alternative, and more citable.

**Structure:** the answer up front (it depends on these three things) → a comparison table
(cost, speed, continuity, breadth, risk) → when each genuinely wins → what to ask before
hiring anyone → red flags.

**Be honest about when a freelancer is wrong for them.** It is the only version of this
article worth reading, and an engine summarising a one-sided page tends to say so.

---

## Writing rules for all ten

1. **First two sentences answer the question.** 44.2% of citations come from the intro.
2. **Use real numbers.** Content with statistics and concrete figures earns 30–40% more
   AI citations than content without.
3. **One H2 per question a reader would actually ask.** Phrase headings as questions where
   it reads naturally.
4. **Link at least two case studies per article.** It is evidence, and it builds the
   internal link graph.
5. **Set `updated` when you revise.** Freshness is a real lever, especially on Perplexity.
6. **Say the uncomfortable thing.** Every one of these briefs has a "be honest about X"
   note. Hedged content is indistinguishable from the marketing pages an engine is trying
   to filter out, and it is also just less useful.

---

## Order to write them

1, 2 and 3 first — they are the highest-citation formats on topics nobody owns. Then 5 and
4. The rest as time allows.

One article a month beats ten in a weekend and then nothing.
