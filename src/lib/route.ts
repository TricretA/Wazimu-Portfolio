import { createContext, useContext, useEffect, useState, type MouseEvent } from 'react';

/**
 * A hand-rolled router, still.
 *
 * It grew from two pages to sixty-six, but the job did not change: read a
 * pathname, return what to render. A router library would add a dependency, a
 * bundle, and an abstraction layer to do exactly this, and every route here is
 * a real static file on disk — there is no dynamic matching to delegate.
 *
 * Two things it does that matter beyond navigation:
 *
 * 1. **It is server-renderable.** `RouteContext` lets the prerender script
 *    supply the pathname, because `window` does not exist at build time.
 * 2. **It distinguishes a page from a modal.** Opening a case study from the
 *    index pushes `/work/<slug>` *and* marks the history entry as a modal, so
 *    the same URL renders as an overlay on a soft navigation and as a full
 *    standalone page on a cold load. Crawlers and shared links always get the
 *    page; the person browsing the index keeps the overlay.
 */

export type Route =
  | { kind: 'home' }
  | { kind: 'work-index' }
  | { kind: 'work'; slug: string }
  | { kind: 'insight-index' }
  | { kind: 'insight'; slug: string }
  | { kind: 'service-index' }
  | { kind: 'service'; slug: string }
  | { kind: 'about' }
  | { kind: 'contact' }
  | { kind: 'privacy' }
  | { kind: 'terms' }
  | { kind: 'data' }
  | { kind: 'not-found' };

export type RouteKind = Route['kind'];

/** Fired on `navigate()`. `popstate` alone misses pushes we make ourselves. */
const ROUTE_EVENT = 'tricreta:route';

/**
 * The pathname during server rendering. `null` on the client, where
 * `window.location` is the source of truth.
 */
export const RouteContext = createContext<string | null>(null);

/** Strips the trailing slash and any `.html` a static host might serve. */
function normalise(pathname: string): string {
  const path = pathname.toLowerCase().replace(/(?:\/index)?(?:\.html)?\/*$/, '');
  return path === '' ? '/' : path;
}

export function toRoute(pathname: string): Route {
  const path = normalise(pathname);

  if (path === '/') return { kind: 'home' };
  if (path === '/privacy') return { kind: 'privacy' };
  if (path === '/terms') return { kind: 'terms' };
  if (path === '/data') return { kind: 'data' };
  if (path === '/about') return { kind: 'about' };
  if (path === '/contact') return { kind: 'contact' };
  if (path === '/work') return { kind: 'work-index' };
  if (path === '/insights') return { kind: 'insight-index' };
  if (path === '/services') return { kind: 'service-index' };

  const work = path.match(/^\/work\/([a-z0-9-]+)$/);
  if (work) return { kind: 'work', slug: work[1] };

  const insight = path.match(/^\/insights\/([a-z0-9-]+)$/);
  if (insight) return { kind: 'insight', slug: insight[1] };

  const service = path.match(/^\/services\/([a-z0-9-]+)$/);
  if (service) return { kind: 'service', slug: service[1] };

  return { kind: 'not-found' };
}

/**
 * Builds the path for a route. The single place URL shapes are written down.
 *
 * Every path ends in a slash because that is the form Cloudflare Pages
 * actually serves: a request for `/privacy` gets a 307 to `/privacy/`. Emitting
 * the unslashed form would put a redirect between a crawler and all sixty-six
 * pages, and would make every canonical and sitemap entry point at a URL that
 * is not the one returning 200. `toRoute` strips the slash again when matching,
 * so nothing downstream has to care.
 */
export const pathFor = {
  home: () => '/',
  workIndex: () => '/work/',
  work: (slug: string) => `/work/${slug}/`,
  insightIndex: () => '/insights/',
  insight: (slug: string) => `/insights/${slug}/`,
  serviceIndex: () => '/services/',
  service: (slug: string) => `/services/${slug}/`,
  about: () => '/about/',
  contact: () => '/contact/',
  legal: (slug: string) => `/${slug}/`
};

interface NavigateOptions {
  /**
   * Marks the history entry as an overlay rather than a destination. The URL
   * changes and can be copied or shared, but the app keeps the page underneath
   * and renders the target as a modal.
   */
  modal?: boolean;
  /** Replace the current entry instead of pushing a new one. */
  replace?: boolean;
}

/** Client-side navigation, so moving around the site costs no round trip. */
export function navigate(path: string, options: NavigateOptions = {}) {
  const state = options.modal ? { modal: true } : {};
  if (options.replace) window.history.replaceState(state, '', path);
  else window.history.pushState(state, '', path);
  window.dispatchEvent(new Event(ROUTE_EVENT));
}

/** True when the current history entry was pushed as an overlay. */
function readIsModal(): boolean {
  return Boolean((window.history.state as { modal?: boolean } | null)?.modal);
}

export interface RouteState {
  route: Route;
  /** Render the target over the page it was opened from, not in place of it. */
  asModal: boolean;
  /** The normalised pathname, for canonical links and scroll keys. */
  path: string;
}

export function useRouteState(): RouteState {
  // During prerendering the pathname comes from context; in the browser the
  // first read must match what the server wrote, or hydration tears.
  const ssrPath = useContext(RouteContext);

  const [state, setState] = useState<RouteState>(() => {
    const path = ssrPath ?? window.location.pathname;
    return {
      route: toRoute(path),
      asModal: ssrPath === null ? readIsModal() : false,
      path: normalise(path)
    };
  });

  useEffect(() => {
    const sync = () => {
      const path = window.location.pathname;
      setState({ route: toRoute(path), asModal: readIsModal(), path: normalise(path) });
    };
    // A cold load can land mid-history with a modal entry restored by the
    // browser, so re-read once after mount rather than trusting first paint.
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener(ROUTE_EVENT, sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(ROUTE_EVENT, sync);
    };
  }, []);

  return state;
}

/** Most callers only need the route itself. */
export function useRoute(): Route {
  return useRouteState().route;
}

/**
 * Props for any anchor that should route in-app but stay a real `href` —
 * crawlers, platform reviewers, and middle-click all need the URL to be there.
 */
export function routeLink(path: string, options: NavigateOptions = {}) {
  return {
    href: path,
    onClick(event: MouseEvent<HTMLAnchorElement>) {
      // Leave modified clicks to the browser: new tab, new window, download.
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (event.button !== 0) return;
      event.preventDefault();
      navigate(path, options);
    }
  };
}

/**
 * Closes an overlay.
 *
 * Going back is the honest reverse of the push that opened it — it keeps the
 * history stack the length the person expects, and the forward button reopens
 * what they just closed. Only a cold load (no modal entry to pop) falls back to
 * replacing the URL.
 */
export function closeOverlay(fallback: string = '/') {
  if (readIsModal()) window.history.back();
  else navigate(fallback, { replace: true });
}
