# Changelog

## Unreleased

### Findable by search engines and AI assistants

The served HTML contained zero words: 48 case studies, 3 articles and every line
of copy existed only inside the JavaScript bundle. No major AI crawler runs
JavaScript, so GPTBot, ClaudeBot and PerplexityBot all saw a blank page. Three
smaller faults compounded it — the canonical tag pointed at `wazimucreations.com`
(a domain that does not resolve), `/og.png` was a 404 so every share card was
broken, and Cloudflare had been returning `403` to GPTBot and ClaudeBot since its
15 September 2026 default change.

- **Prerendering.** `npm run build` now renders every route to real HTML with
  `react-dom/server` (`scripts/prerender.mjs`), and the client hydrates it. The
  home page ships ~1,000 words on first byte. The build fails if any page renders
  under 50 words.
- **66 URLs, up from 4.** Case studies (`/work/<slug>`), articles
  (`/insights/<slug>`), services (`/services/<slug>`), plus `/work`, `/insights`,
  `/services`, `/about` and `/contact`. Case studies and articles were previously
  modals with no address at all; the article slugs in `insights.ts` had never been
  used for routing.
- **Modals kept.** Clicking a card still opens the overlay — it pushes
  `/work/<slug>` and marks the history entry as an overlay. A cold load of the same
  URL renders the standalone page. `/?problem=<slug>` redirects to the new URL.
- **Entry reveals slide instead of fading.** `opacity: 0` in a prerendered page is
  content that is present but hidden, which is the one state a search engine should
  never find text in.
- **One `<h1>` per page**, and the home page has one at all now. It leads with the
  specialism and the geography; the previous headline stays as the sub-line.
- **Structured data** generated from the same data the pages render: `Person`,
  `ProfessionalService`, `ProfilePage`, 48 × `CreativeWork`, 7 × `FAQPage`,
  `BlogPosting`, `Service`, `Review` and `BreadcrumbList` on 62 pages. The old
  hand-written block carried the wrong phone number.
- **`robots.txt`, `sitemap.xml`, `rss.xml`, `llms.txt`, `llms-full.txt`,
  `site.webmanifest`, `404.html` and `og.png`** — none of which existed.
- **`public/_redirects`** so missing paths return a real `404` instead of the home
  page with a `200`.
- **`site.origin`** in `src/data/site.ts` is now the single source for every
  absolute URL.
- **Positioning** leads with automation and applied AI. Services reordered; web,
  mobile, design and video keep their full cards.
- **Opt-in analytics and search-console verification** in `src/data/site.ts`.
  Nothing third-party ships until it is configured.
- **Performance.** The render-blocking Google Fonts `@import` moved to a
  non-blocking `<link>`, 7 MB of unreferenced assets removed, and case-study
  screenshots given intrinsic dimensions and real alt text.
- `aboutFacts` now claims 48 documented case studies rather than "732+", which the
  rest of the site contradicted.
- Added `docs/ai-visibility-playbook.md` and `docs/content-briefs.md`.

- Added a Data Deletion Request page (`/data`) with a form for business name,
  phone, email, and reason. Submitting it issues a reference and states the
  24-hour window and that deletion cannot be reversed. The receiving endpoint
  is not wired up yet — set `DELETION_ENDPOINT` in `src/data/legal.ts`. Until
  then the confirmation hands the requester a prefilled WhatsApp and email
  route so a request still reaches a person.
- Added the Privacy Policy (`/privacy`) and Terms of Service (`/terms`) pages,
  linked from the footer between GitHub and CV. All three legal pages are built
  as their own static entries so the URLs resolve without a host rewrite rule —
  platform reviewers such as Meta's WhatsApp Business API request them cold.
- Added the VacaSky Adventure Travel Website case study, with a captured hero image, live-site link, and public source link.
