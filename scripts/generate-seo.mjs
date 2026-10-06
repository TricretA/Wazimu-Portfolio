import { writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Writes the crawl surfaces: robots.txt, sitemap.xml, rss.xml, llms.txt and
 * llms-full.txt.
 *
 * All of them are generated from the same data the pages render, so a new case
 * study lands in every one of them the moment it appears in `data/problems.ts`.
 * A hand-maintained sitemap is a sitemap that is wrong by the third edit.
 *
 * On llms.txt, honestly: the measured evidence is that AI crawlers almost never
 * request it — on the order of a few hundred fetches across hundreds of
 * millions of bot visits — and Google's May 2026 guidance says outright that
 * you do not need it. It is here because it costs one function and is genuinely
 * used by AI coding agents and some smaller answer engines. The prerendered
 * HTML is what actually earns citations; this is a courtesy, not a strategy.
 */

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, '.ssr');

const xmlEscape = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/** Strips the `**accent**` markers so plain-text surfaces read as prose. */
const plain = (text) => text.replace(/\*\*(.+?)\*\*/g, '$1');

/* ------------------------------------------------------------------ *
 * robots.txt
 * ------------------------------------------------------------------ */

/**
 * The bots worth naming explicitly.
 *
 * A bare `User-agent: *` already allows all of these, so this is belt and
 * braces — but it is also a statement of intent that survives someone later
 * tightening the wildcard, and it is the file a person checks first when
 * asking why an engine is not indexing the site.
 *
 * The real gate is Cloudflare's AI Crawl Control, which blocked GPTBot and
 * ClaudeBot by default from 15 September 2026. robots.txt cannot override a
 * 403 at the edge.
 */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'GoogleOther',
  'Applebot',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
  'Meta-ExternalAgent',
  'Amazonbot',
  'DuckAssistBot',
  'cohere-ai',
  'YouBot'
];

function robotsTxt(origin) {
  const blocks = [
    '# Everything here is public and meant to be read, by people and machines alike.',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    '# Named explicitly so intent survives a future edit to the wildcard above.',
    ...AI_AGENTS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
    `Sitemap: ${origin}/sitemap.xml`,
    ''
  ];
  return blocks.join('\n');
}

/* ------------------------------------------------------------------ *
 * sitemap.xml
 * ------------------------------------------------------------------ */

function sitemapXml(origin, routeTable, today) {
  const urls = routeTable
    .map((entry) => {
      const loc = `${origin}${entry.path === '/' ? '/' : entry.path}`;
      return [
        '  <url>',
        `    <loc>${xmlEscape(loc)}</loc>`,
        `    <lastmod>${entry.lastmod ?? today}</lastmod>`,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority.toFixed(1)}</priority>`,
        '  </url>'
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

/* ------------------------------------------------------------------ *
 * rss.xml
 * ------------------------------------------------------------------ */

function rssXml(origin, site, insights) {
  const items = insights
    .map((post) => {
      const url = `${origin}/insights/${post.slug}`;
      return [
        '    <item>',
        `      <title>${xmlEscape(post.title)}</title>`,
        `      <link>${xmlEscape(url)}</link>`,
        `      <guid isPermaLink="true">${xmlEscape(url)}</guid>`,
        `      <pubDate>${new Date(`${post.published}T09:00:00Z`).toUTCString()}</pubDate>`,
        `      <description>${xmlEscape(post.dek)}</description>`,
        `      <content:encoded><![CDATA[${plain(post.body)
          .split('\n\n')
          .map((p) => `<p>${p}</p>`)
          .join('')}]]></content:encoded>`,
        '    </item>'
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(site.workName)} — Insights</title>
    <link>${origin}/insights</link>
    <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Writing on automation, applied AI, and building software that does a job.</description>
    <language>en</language>
    <managingEditor>${xmlEscape(site.email)} (${xmlEscape(site.name)})</managingEditor>
${items}
  </channel>
</rss>
`;
}

/* ------------------------------------------------------------------ *
 * llms.txt / llms-full.txt
 * ------------------------------------------------------------------ */

function llmsTxt({ origin, site, services, problems, insights, categories }) {
  const lines = [
    `# ${site.name} (${site.workName})`,
    '',
    `> ${site.jobTitle} based in ${site.location.country}. Builds ${site.specialism} for businesses across ${site.location.region} and remotely worldwide. ${problems.length} documented case studies, each naming a real business problem, the system built to remove it, and what changed afterwards.`,
    '',
    `Contact: WhatsApp ${site.phone} · ${site.email} · ${origin}/contact`,
    '',
    '## Services',
    ''
  ];

  for (const service of services) {
    lines.push(`- [${service.title}](${origin}/services/${service.slug}): ${service.lede}`);
  }

  lines.push('', '## Writing', '');
  for (const post of insights) {
    lines.push(
      `- [${post.title}](${origin}/insights/${post.slug}): ${post.dek} (${post.published})`
    );
  }

  for (const category of categories) {
    const entries = problems.filter((p) => p.category === category);
    if (!entries.length) continue;
    lines.push('', `## Case studies — ${category}`, '');
    for (const project of entries) {
      lines.push(`- [${project.title}](${origin}/work/${project.slug}): ${project.summary}`);
    }
  }

  lines.push(
    '',
    '## Optional',
    '',
    `- [About](${origin}/about): background, specialisms and where the work happens.`,
    `- [All case studies](${origin}/work): every project in one page.`,
    `- [Full text](${origin}/llms-full.txt): every page's content as one document.`,
    ''
  );

  return lines.join('\n');
}

function llmsFullTxt({ origin, site, services, problems, insights, aboutParagraphs }) {
  const out = [
    `# ${site.name} (${site.workName}) — complete site content`,
    '',
    `Source: ${origin}`,
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    '',
    '## About',
    '',
    ...aboutParagraphs.map(plain),
    '',
    `Contact: WhatsApp ${site.phone} · email ${site.email} · ${origin}/contact`,
    `Links: ${site.socials.linkedin} · ${site.socials.github} · ${site.cvUrl}`,
    '',
    '---',
    '',
    '## Services',
    ''
  ];

  for (const service of services) {
    out.push(
      `### ${service.title}`,
      '',
      `URL: ${origin}/services/${service.slug}`,
      '',
      service.lede,
      '',
      plain(service.detail),
      '',
      `Fixes: ${service.solves.join(' · ')}`,
      `Tools: ${service.stack.map((s) => s.name).join(', ')}`,
      ''
    );
    for (const faq of service.faqs) {
      out.push(`**${faq.question}** ${faq.answer}`, '');
    }
  }

  out.push('---', '', '## Case studies', '');
  for (const project of problems) {
    out.push(
      `### ${project.title} (${project.category})`,
      '',
      `URL: ${origin}/work/${project.slug}`,
      project.status === 'public' && project.link ? `Live: ${project.link}` : 'Status: private deployment',
      '',
      `Summary: ${project.summary}`,
      `Problem: ${project.problem}`,
      `Solution: ${project.solution}`,
      `Outcome: ${project.outcome}`,
      ''
    );
  }

  out.push('---', '', '## Writing', '');
  for (const post of insights) {
    out.push(
      `### ${post.title}`,
      '',
      `URL: ${origin}/insights/${post.slug}`,
      `Published: ${post.published}`,
      '',
      plain(post.body),
      ''
    );
  }

  return out.join('\n');
}

/* ------------------------------------------------------------------ *
 * Run
 * ------------------------------------------------------------------ */

async function main() {
  const entryPath = path.join(ssrDir, 'entry-server.js');
  if (!existsSync(entryPath)) {
    throw new Error('.ssr/entry-server.js is missing — run the build in order.');
  }
  const mod = await import(`file://${entryPath.replace(/\\/g, '/')}`);
  const { routeTable, seo } = mod;
  const { site, services, problems, insights, categories, aboutParagraphs } = seo;
  const origin = site.origin;
  const today = new Date().toISOString().slice(0, 10);

  const files = {
    'robots.txt': robotsTxt(origin),
    'sitemap.xml': sitemapXml(origin, routeTable, today),
    'rss.xml': rssXml(origin, site, insights),
    'llms.txt': llmsTxt({ origin, site, services, problems, insights, categories }),
    'llms-full.txt': llmsFullTxt({
      origin,
      site,
      services,
      problems,
      insights,
      aboutParagraphs
    })
  };

  for (const [name, contents] of Object.entries(files)) {
    await writeFile(path.join(dist, name), contents, 'utf8');
  }

  await rm(ssrDir, { recursive: true, force: true });

  console.log(
    `  wrote ${Object.keys(files).join(', ')} (${routeTable.length} URLs in the sitemap)`
  );
}

main().catch((error) => {
  console.error('\nSEO generation failed:', error.message);
  process.exit(1);
});
