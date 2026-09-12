import { useEffect, useState, type MouseEvent } from 'react';

/**
 * A two-page router, hand-rolled.
 *
 * The site is one scrolling page plus the two legal documents Meta and other
 * platform reviewers require at their own URLs, so a router library would be
 * more machinery than the problem needs.
 *
 * `/privacy` and `/terms` are also built as real static entries (see
 * `vite.config.ts`), so a cold visit to either URL resolves on any static host
 * without a rewrite rule. This hook only covers navigation once the app is
 * already running.
 */
export type Route = 'home' | 'privacy' | 'terms';

/** Fired on `navigate()`. `popstate` alone misses pushes we make ourselves. */
const ROUTE_EVENT = 'tricreta:route';

export function toRoute(pathname: string): Route {
  // Tolerates `/privacy`, `/privacy/`, and the `/privacy.html` a host may serve.
  const path = pathname.toLowerCase().replace(/(?:\/index)?(?:\.html)?\/*$/, '');
  if (path.endsWith('/privacy')) return 'privacy';
  if (path.endsWith('/terms')) return 'terms';
  return 'home';
}

/** Client-side navigation, so leaving the home page costs no round trip. */
export function navigate(path: string) {
  if (window.location.pathname === path) return;
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event(ROUTE_EVENT));
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => toRoute(window.location.pathname));

  useEffect(() => {
    const sync = () => setRoute(toRoute(window.location.pathname));
    window.addEventListener('popstate', sync);
    window.addEventListener(ROUTE_EVENT, sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(ROUTE_EVENT, sync);
    };
  }, []);

  return route;
}

/**
 * Props for any anchor that should route in-app but stay a real `href` —
 * crawlers, platform reviewers, and middle-click all need the URL to be there.
 */
export function routeLink(path: string) {
  return {
    href: path,
    onClick(event: MouseEvent<HTMLAnchorElement>) {
      // Leave modified clicks to the browser: new tab, new window, download.
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (event.button !== 0) return;
      event.preventDefault();
      navigate(path);
    }
  };
}
