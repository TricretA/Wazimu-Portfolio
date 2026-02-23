# Wazimu Portfolio

Private personal portfolio site with a conversational intake flow and proposal approval.

## Stack

- React + Vite
- Express API server
- Tailwind CSS

## Requirements

- Node.js 18+

## Environment

Create a `.env.local` file in the project root with:

```
GEMINI_API_KEY=your_gemini_key
MAKE_WEBHOOK=your_webhook_url
```

`MAKE_WEBHOOK` can also be provided as `WEBHOOK_URL` or `WEBHOOK`.

## Run locally

Install dependencies:

```
npm install
```

Start the API server:

```
npm run server
```

Start the Vite dev server:

```
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

## Notes

- This is a private portfolio project and is not intended for public reuse.
