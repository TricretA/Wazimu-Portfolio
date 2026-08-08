# Tricreta Portfolio — Reinhard Bonke

Personal portfolio site. Fully static — there is no backend and no API keys.

## Stack

- React + Vite
- Tailwind CSS
- Motion (animation)

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

## Lint

```
npm run lint
```

## Content

Everything the site renders lives in `src/data` — edit these rather than the components:

| File              | Holds                                                          |
| ----------------- | -------------------------------------------------------------- |
| `problems.ts`     | The project index: problem, solution, outcome, link, screenshot |
| `services.ts`     | Capabilities, what each solves, and the stack shown per card    |
| `testimonials.ts` | Client quotes, attribution, and the project each links to       |
| `insights.ts`     | Articles. `**wrapped**` text renders as accent emphasis         |
| `site.ts`         | Contact details, socials, and the About copy                    |

## Assets

- `public/work/` — project screenshots (16:10). A project with `image: null`
  renders a generated placeholder instead, so a missing shot never breaks a card.
- `public/stack/` — one logo per stack entry in `services.ts`.
- `public/avatars/` — optional client headshots for `testimonials.ts`. Without one,
  the card falls back to an initials disc.

## Notes

- This is a private portfolio project and is not intended for public reuse.
