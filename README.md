# Tricreta Portfolio — Reinhard Bonke

Personal portfolio site. Fully static — there is no backend and no API keys.

Deployed to **Cloudflare Pages** at [tricreta.co.ke](https://tricreta.co.ke).

## Stack

- React + Vite
- Tailwind CSS
- Motion (animation)
- Build-time prerendering with `react-dom/server` — no framework

## Requirements

- Node.js 18+

## Run locally

```
npm install
npm run dev
```

## Build

```
npm run build
```

Four steps, in order — each depends on the one before it:

| Step | What it does |
| ---- | ------------ |
| `vite build` | The client bundle, into `dist/`. Its `index.html` becomes the template. |
| `vite build --ssr src/entry-server.tsx --outDir .ssr` | The same app, built for Node. |
| `node scripts/prerender.mjs` | Renders all 66 routes to real HTML in `dist/`, plus `404.html`. |
| `node scripts/generate-seo.mjs` | Writes `robots.txt`, `sitemap.xml`, `rss.xml`, `llms.txt`, `llms-full.txt`, then deletes `.ssr/`. |

The prerender step **fails the build** if any page renders under 50 words, which is the
canary for prerendering having silently broken.

## Lint

```
npm run lint
```

## Why the site is prerendered

As of 2026 no major AI crawler executes JavaScript. GPTBot, ClaudeBot and PerplexityBot
fetch the raw HTML with a one-to-five-second timeout, take what is there, and do not come
back. A client-rendered SPA hands them `<div id="root"></div>`.

Before this, the served HTML contained **zero words** — 48 case studies, 3 articles and
every line of copy existed only inside a 495 KB JavaScript bundle. The home page now
ships around 1,000 words of real text on first byte, and every case study has its own
URL.

Two consequences worth knowing when editing:

- **Entry animations slide, they do not fade.** Whatever `initial` sets is what sits in
  the static HTML, and `opacity: 0` there means content is present but hidden — the one
  state you never want a search engine to find text in. Modals are exempt; they only
  exist after hydration.
- **`index.html` is the dev page and the build template, not the shipped home page.**
  Meta tags edited there affect `npm run dev` only. The real ones come from
  `src/lib/meta.ts`.

## Content

Everything the site renders lives in `src/data` — edit these rather than the components:

| File              | Holds                                                           |
| ----------------- | --------------------------------------------------------------- |
| `site.ts`         | Origin, contact details, socials, About copy, `knowsAbout`, analytics config |
| `problems.ts`     | The project index: problem, solution, outcome, link, screenshot   |
| `services.ts`     | Capabilities, page copy, FAQs, and the stack shown per card       |
| `testimonials.ts` | Client quotes, attribution, and the project each links to         |
| `insights.ts`     | Articles. `**wrapped**` text renders as accent emphasis           |
| `faqs.ts`         | The contact-page questions, shared with the FAQPage schema        |
| `legal.ts`        | Privacy, Terms, and Data Deletion copy, plus `DELETION_ENDPOINT`  |

Adding a case study to `problems.ts` gives it a URL, a prerendered page, `CreativeWork`
schema, a sitemap entry, an llms.txt line and internal links from its category siblings.
There is nothing else to remember.

### The SEO layer

| File | Holds |
| ---- | ----- |
| `src/lib/route.ts`   | Route parsing, navigation, and the page-vs-overlay distinction |
| `src/lib/meta.ts`    | Per-route title, description, canonical, OG — and the route table |
| `src/lib/schema.ts`  | JSON-LD, generated from the same data the pages render |

`site.origin` in `src/data/site.ts` is the single source for every absolute URL. Changing
domain is a one-line edit.

## Pages

66 URLs, all real static files.

| URL | Renders |
| --- | ------- |
| `/` | The portfolio — one scrolling page |
| `/work` | Flat index of all 48 case studies |
| `/work/<slug>` | One case study (48) |
| `/services` | The six capabilities |
| `/services/<slug>` | One service, with FAQs (6) |
| `/insights` | The writing |
| `/insights/<slug>` | One article (3) |
| `/about` | Background and specialisms |
| `/contact` | Contact routes and buyer FAQs |
| `/privacy` `/terms` `/data` | Legal, required by platform reviewers |

### Pages and overlays

Clicking a case study on the home page opens the **modal**, exactly as before — it just
pushes `/work/<slug>` and marks the history entry as an overlay. A **cold load** of that
same URL has no such mark and renders the standalone page.

One URL, two presentations, no duplicate content. Crawlers and shared links always get
the page; the person browsing the index keeps the overlay.

## Deployment (Cloudflare Pages)

- Build command `npm run build`, output directory `dist`.
- **Turn OFF the dashboard's "Single Page Application" setting.** `public/_redirects`
  handles routing, and the dashboard's catch-all overrides it — which is what made every
  unmatched path return the home page with a `200`.
- **AI Crawl Control → Search / Agent / Training must all be Allow.** Cloudflare began
  blocking Training and Agent crawlers by default on 15 September 2026; that returned
  `403` to GPTBot and ClaudeBot until it was changed on 22 September 2026. Check this
  after any change to Bot Fight Mode or WAF rules.
- **Markdown for Agents** (AI Crawl Control, Pro plan) is worth enabling *after* this —
  it converts each page to Markdown on `Accept: text/markdown`, carries the JSON-LD
  through, and would have produced an empty document before prerendering existed.

## Assets

- `public/work/` — project screenshots (16:10). A project with `image: null` renders a
  generated placeholder instead, so a missing shot never breaks a card.
- `public/stack/` — one logo per stack entry in `services.ts`.
- `public/avatars/` — optional client headshots for `testimonials.ts`.
- `public/og.png` — the 1200×630 share card.

## Documentation

- [`docs/ai-visibility-playbook.md`](docs/ai-visibility-playbook.md) — the off-site work.
  Roughly 85% of brand mentions in AI answers come from third-party pages, so this is
  where the remaining ceiling is.
- [`docs/content-briefs.md`](docs/content-briefs.md) — ten article briefs, ordered.

## Notes

- This is a private portfolio project and is not intended for public reuse.
