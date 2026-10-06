import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import SiteHeader from './components/SiteHeader';
import Hero from './components/Hero';
import ProblemIndex from './components/ProblemIndex';
import Credentials from './components/Credentials';
import Capability from './components/Capability';
import Method from './components/Method';
import Testimonials from './components/Testimonials';
import Insights from './components/Insights';
import SiteFooter from './components/SiteFooter';
import AboutModal from './components/AboutModal';
import BackToTop from './components/BackToTop';
import LegalPage from './components/LegalPage';
import DataDeletionPage from './components/DataDeletionPage';
import WorkPage from './components/WorkPage';
import WorkIndexPage from './components/WorkIndexPage';
import InsightPage from './components/InsightPage';
import InsightIndexPage from './components/InsightIndexPage';
import ServicePage from './components/ServicePage';
import ServiceIndexPage from './components/ServiceIndexPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import NotFoundPage from './components/NotFoundPage';
import { privacyPolicy, termsOfService } from './data/legal';
import { findProblem } from './data/problems';
import { findInsight } from './data/insights';
import { findService } from './data/services';
import { navigate, pathFor, useRouteState } from './lib/route';
import { headFor } from './lib/meta';

/**
 * Keeps the tab title and description in step with a client-side navigation.
 *
 * The prerendered HTML already carries the right head for every URL, so this
 * only matters once the app takes over. Without it, clicking from the index
 * into a case study leaves the previous page's title in the tab and in
 * anything that reads the live DOM.
 */
function useDocumentHead(title: string, description: string, canonical: string) {
  useEffect(() => {
    document.title = title;

    const set = (selector: string, attribute: string, value: string) => {
      const node = document.querySelector(selector);
      if (node) node.setAttribute(attribute, value);
    };

    set('meta[name="description"]', 'content', description);
    set('link[rel="canonical"]', 'href', canonical);
    set('meta[property="og:title"]', 'content', title);
    set('meta[property="og:description"]', 'content', description);
    set('meta[property="og:url"]', 'content', canonical);
  }, [title, description, canonical]);
}

/**
 * Sends the old `/?problem=<slug>` deep links to the case study's real URL.
 *
 * Case studies used to be addressable only by that query parameter, and links
 * to it are out in the world. Cloudflare Pages cannot match on a query string,
 * so this cannot live in `_redirects` — and doing it here is arguably better:
 * a crawler that follows an old link lands on a page whose canonical points at
 * the new URL either way.
 */
function useLegacyDeepLink() {
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('problem');
    if (!slug) return;
    // `replace`, not push — the old URL should not sit in the back button.
    navigate(pathFor.work(slug), { replace: true });
  }, []);
}

export default function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { route, asModal } = useRouteState();
  const head = headFor(route);

  useDocumentHead(head.title, head.description, head.canonical);
  useLegacyDeepLink();

  /*
   * A case study opened from the index pushes `/work/<slug>` but marks the
   * history entry as an overlay, so the URL is shareable while the page
   * underneath stays put. A cold load of that same URL has no such mark and
   * gets the standalone page — which is what every crawler and every shared
   * link receives. One URL, two presentations, no duplicate content.
   */
  const isOverlay = asModal && (route.kind === 'work' || route.kind === 'insight');

  if (!isOverlay) {
    switch (route.kind) {
      case 'privacy':
        return <LegalPage doc={privacyPolicy} />;
      case 'terms':
        return <LegalPage doc={termsOfService} />;
      case 'data':
        return <DataDeletionPage />;
      case 'work-index':
        return <WorkIndexPage />;
      case 'insight-index':
        return <InsightIndexPage />;
      case 'service-index':
        return <ServiceIndexPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'work': {
        const problem = findProblem(route.slug);
        return problem ? <WorkPage problem={problem} /> : <NotFoundPage />;
      }
      case 'insight': {
        const post = findInsight(route.slug);
        return post ? <InsightPage post={post} /> : <NotFoundPage />;
      }
      case 'service': {
        const service = findService(route.slug);
        return service ? <ServicePage service={service} /> : <NotFoundPage />;
      }
      case 'not-found':
        return <NotFoundPage />;
    }
  }

  return (
    <div className="page-shell">
      <div className="aurora-layer" aria-hidden="true" />

      {/*
        Lives at page level, not inside the hero: the head is sized to fill the
        first screen and the rest of the figure carries on down behind the
        sections below, which a hero-scoped element would clip. Decorative only.
      */}
      <img
        src="/portrait.webp"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="hero-portrait"
      />

      <SiteHeader onOpenAbout={() => setIsAboutOpen(true)} />

      <main className="page-content">
        <Hero />
        {/* The Index sits directly under the hero — it is the argument, not a modal. */}
        <ProblemIndex />
        <Credentials />
        <Capability />
        <Method />
        <Testimonials />
        <Insights />
      </main>

      <SiteFooter />
      <BackToTop />

      <AnimatePresence>
        {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
