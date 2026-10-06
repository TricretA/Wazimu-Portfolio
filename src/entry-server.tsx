import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { RouteContext, toRoute } from './lib/route';
import { headFor, routeTable, allPaths } from './lib/meta';
import { schemaJson } from './lib/schema';
import { site, aboutParagraphs, analytics, verification } from './data/site';
import { services } from './data/services';
import { solvedProblems, categories } from './data/problems';
import { insightsByDate } from './data/insights';

/**
 * The build-time half of the app.
 *
 * `scripts/prerender.mjs` imports this, walks every path in the route table,
 * and writes real HTML to disk. The browser bundle then hydrates that HTML
 * rather than building the page from nothing.
 *
 * This exists because of one fact: as of 2026 no major AI crawler executes
 * JavaScript. GPTBot, ClaudeBot and PerplexityBot fetch the HTML, take what is
 * in it, and move on within a few seconds. A client-rendered SPA hands them
 * `<div id="root"></div>` and they leave with nothing — which is exactly what
 * this site was doing for all 48 case studies.
 */

export interface RenderedPage {
  path: string;
  html: string;
  head: ReturnType<typeof headFor>;
  /** Serialised `@graph`, or null where a route carries no schema. */
  schema: string | null;
}

export function render(path: string): RenderedPage {
  const route = toRoute(path);

  const html = renderToString(
    <StrictMode>
      <RouteContext.Provider value={path}>
        <App />
      </RouteContext.Provider>
    </StrictMode>
  );

  return { path, html, head: headFor(route), schema: schemaJson(route) };
}

export { routeTable, allPaths };

/**
 * The content, handed to `scripts/generate-seo.mjs`.
 *
 * It comes through this module rather than being imported from `src/data`
 * directly because those files import `lucide-react` for their icons, which a
 * plain Node script cannot load. The SSR bundle has already resolved all of
 * that, so the generator gets plain data and the sitemap, RSS feed and
 * llms.txt are guaranteed to describe the same pages that were just written.
 */
export const seo = {
  site,
  analytics,
  verification,
  aboutParagraphs,
  services,
  problems: solvedProblems,
  categories: categories.filter((category) => category !== 'All'),
  insights: insightsByDate
};
