import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Turns the client bundle into 66 real HTML pages.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server). It takes
 * the client's `index.html` as a template — so the hashed script and style
 * tags are always the ones that were just built — renders each route with
 * `react-dom/server`, and writes the result to `dist/<path>/index.html`.
 *
 * The head is rewritten per page rather than appended to: a single template
 * with 66 different titles injected is the only arrangement where the title a
 * crawler reads and the title the page renders cannot drift apart.
 */

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, '.ssr');

/* ------------------------------------------------------------------ *
 * Head construction
 * ------------------------------------------------------------------ */

const FONT_CSS =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800' +
  '&family=JetBrains+Mono:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap';

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * `</script>` inside a JSON string would close the block early; the other two
 * guard against HTML comment sequences being treated as markup.
 */
const escapeJsonLd = (json) =>
  json.replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');

/**
 * Ownership verification and analytics, both opt-in from `src/data/site.ts`.
 *
 * Nothing is emitted until it is configured, so the default build ships no
 * third-party script at all.
 */
function buildSiteTags({ verification, analytics }) {
  const tags = [];

  if (verification?.google) {
    tags.push(`<meta name="google-site-verification" content="${escapeHtml(verification.google)}" />`);
  }
  if (verification?.bing) {
    tags.push(`<meta name="msvalidate.01" content="${escapeHtml(verification.bing)}" />`);
  }

  if (analytics?.provider === 'plausible' && analytics.domain) {
    const src = analytics.scriptUrl ?? 'https://plausible.io/js/script.outbound-links.js';
    tags.push(
      `<script defer data-domain="${escapeHtml(analytics.domain)}" src="${escapeHtml(src)}"></script>`
    );
  }
  if (analytics?.provider === 'umami' && analytics.domain) {
    const src = analytics.scriptUrl ?? 'https://cloud.umami.is/script.js';
    tags.push(
      `<script defer data-website-id="${escapeHtml(analytics.domain)}" src="${escapeHtml(src)}"></script>`
    );
  }

  return tags;
}

function buildHead(head, schema, siteTags = []) {
  const tags = [
    '<meta charset="UTF-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '<meta name="theme-color" content="#020307" />',
    '<meta name="color-scheme" content="dark" />',
    `<title>${escapeHtml(head.title)}</title>`,
    `<meta name="title" content="${escapeHtml(head.title)}" />`,
    `<meta name="description" content="${escapeHtml(head.description)}" />`,
    '<meta name="author" content="Reinhard Bonke" />',
    head.noindex
      ? '<meta name="robots" content="noindex, follow" />'
      : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />',
    `<link rel="canonical" href="${escapeHtml(head.canonical)}" />`,
    '<link rel="icon" type="image/png" href="/favicon.png" />',
    '<link rel="apple-touch-icon" href="/favicon.png" />',
    '<link rel="manifest" href="/site.webmanifest" />',
    '<link rel="alternate" type="application/rss+xml" title="Tricreta — Insights" href="/rss.xml" />',
    '<link rel="preconnect" href="https://fonts.googleapis.com" />',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />',
    // Loaded here rather than via `@import` in index.css: an @import is
    // serial — the browser has to parse the stylesheet before it even learns
    // the fonts exist — which pushes back first paint on every page.
    `<link rel="stylesheet" href="${FONT_CSS}" media="print" onload="this.media='all'" />`,
    `<noscript><link rel="stylesheet" href="${FONT_CSS}" /></noscript>`,

    '<meta property="og:site_name" content="Tricreta" />',
    '<meta property="og:locale" content="en_KE" />',
    `<meta property="og:type" content="${head.ogType}" />`,
    `<meta property="og:title" content="${escapeHtml(head.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(head.description)}" />`,
    // Absolute, not root-relative: several scrapers refuse to resolve a
    // relative og:image and simply show no card at all.
    `<meta property="og:image" content="${escapeHtml(head.ogImage)}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:url" content="${escapeHtml(head.canonical)}" />`,

    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:site" content="@tricreta" />',
    '<meta name="twitter:creator" content="@tricreta" />',
    `<meta name="twitter:title" content="${escapeHtml(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(head.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(head.ogImage)}" />`
  ];

  if (head.publishedTime) {
    tags.push(`<meta property="article:published_time" content="${head.publishedTime}" />`);
  }
  if (head.modifiedTime) {
    tags.push(`<meta property="article:modified_time" content="${head.modifiedTime}" />`);
  }

  tags.push(...siteTags);

  if (schema) {
    tags.push(
      `<script type="application/ld+json">${escapeJsonLd(schema)}</script>`
    );
  }

  return tags.map((tag) => `    ${tag}`).join('\n');
}

/* ------------------------------------------------------------------ *
 * Template
 * ------------------------------------------------------------------ */

/**
 * Pulls the built asset tags out of the client `index.html`.
 *
 * Vite writes hashed filenames, so these cannot be hardcoded — they have to
 * be read back from whatever the build just produced.
 */
function extractAssets(template) {
  const scripts = [...template.matchAll(/<script[^>]*type="module"[^>]*><\/script>/g)].map(
    (m) => m[0]
  );
  // Only the build's own stylesheets. The dev template also carries a Google
  // Fonts link, and `buildHead` emits that itself — picking it up here too
  // would put it in the document twice.
  const styles = [...template.matchAll(/<link[^>]*rel="stylesheet"[^>]*>/g)]
    .map((m) => m[0])
    .filter((tag) => /href="\/assets\//.test(tag));
  const modulePreloads = [...template.matchAll(/<link[^>]*rel="modulepreload"[^>]*>/g)].map(
    (m) => m[0]
  );

  if (scripts.length === 0) {
    throw new Error(
      'No module script found in dist/index.html — did `vite build` run before this?'
    );
  }

  return { scripts, styles, modulePreloads };
}

function buildDocument({ head, schema, html, assets, siteTags }) {
  const assetTags = [...assets.styles, ...assets.modulePreloads, ...assets.scripts]
    .map((tag) => `    ${tag}`)
    .join('\n');

  return `<!doctype html>
<html lang="en">
  <head>
${buildHead(head, schema, siteTags)}
${assetTags}
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>
`;
}

/* ------------------------------------------------------------------ *
 * Run
 * ------------------------------------------------------------------ */

/** `/` → `dist/index.html`; `/work/x` → `dist/work/x/index.html`. */
function outputPath(routePath) {
  if (routePath === '/') return path.join(dist, 'index.html');
  return path.join(dist, routePath.replace(/^\//, ''), 'index.html');
}

async function main() {
  const templatePath = path.join(dist, 'index.html');
  if (!existsSync(templatePath)) {
    throw new Error('dist/index.html is missing — run `vite build` first.');
  }

  const template = await readFile(templatePath, 'utf8');
  const assets = extractAssets(template);

  const entryPath = path.join(ssrDir, 'entry-server.js');
  if (!existsSync(entryPath)) {
    throw new Error('.ssr/entry-server.js is missing — run the SSR build first.');
  }
  const { render, routeTable, seo } = await import(
    `file://${entryPath.replace(/\\/g, '/')}`
  );
  const siteTags = buildSiteTags(seo);

  let written = 0;
  let emptiest = { path: null, words: Infinity };

  for (const entry of routeTable) {
    const page = render(entry.path);
    const document = buildDocument({
      head: page.head,
      schema: page.schema,
      html: page.html,
      assets,
      siteTags
    });

    const file = outputPath(entry.path);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, document, 'utf8');
    written += 1;

    // A page that renders no text is a page a crawler learns nothing from —
    // worth failing the build over rather than shipping and discovering later.
    const words = page.html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .filter(Boolean).length;
    if (words < emptiest.words) emptiest = { path: entry.path, words };
  }

  // A real 404 document for the host to serve on an unmatched path, so a typo
  // stops returning the home page with a 200.
  const notFound = render('/this-path-does-not-exist');
  await writeFile(
    path.join(dist, '404.html'),
    buildDocument({
      head: notFound.head,
      schema: notFound.schema,
      html: notFound.html,
      assets,
      siteTags
    }),
    'utf8'
  );

  // `.ssr` stays until generate-seo.mjs has used it too; that script removes it.

  console.log(`  prerendered ${written} pages + 404.html`);
  console.log(`  thinnest page: ${emptiest.path} (${emptiest.words} words)`);

  if (emptiest.words < 50) {
    throw new Error(
      `${emptiest.path} rendered only ${emptiest.words} words — prerendering is not working.`
    );
  }
}

main().catch((error) => {
  console.error('\nPrerender failed:', error.message);
  process.exit(1);
});
