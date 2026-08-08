import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import SiteHeader from './components/SiteHeader';
import Hero from './components/Hero';
import ProblemIndex from './components/ProblemIndex';
import Capability from './components/Capability';
import Method from './components/Method';
import Testimonials from './components/Testimonials';
import Insights from './components/Insights';
import SiteFooter from './components/SiteFooter';
import AboutModal from './components/AboutModal';

export default function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

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
        <Capability />
        <Method />
        <Testimonials />
        <Insights />
      </main>

      <SiteFooter />

      <AnimatePresence>
        {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
