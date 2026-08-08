import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Search, X, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import {
  solvedProblems,
  categories,
  categoryIcon,
  problemCount,
  type FilterCategory,
  type SolvedProblem
} from '../data/problems';
import ProblemDetail from './ProblemDetail';
import CategoryBadge from './CategoryBadge';
import WorkShot from './WorkShot';
import { OPEN_PROBLEM_EVENT } from '../lib/openProblem';

const INITIAL_VISIBLE = 9;

export default function ProblemIndex() {
  const reduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<SolvedProblem | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  /* ----- deep link: ?problem=slug opens the case study directly ----- */
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('problem');
    if (!slug) return;
    const match = solvedProblems.find((p) => p.slug === slug);
    if (!match) return;
    setSelected(match);
    // Defer so layout has settled before scrolling the section into view.
    requestAnimationFrame(() =>
      document.getElementById('index')?.scrollIntoView({ block: 'start' })
    );
  }, []);

  const openProblem = useCallback((problem: SolvedProblem) => {
    setSelected(problem);
    const url = new URL(window.location.href);
    url.searchParams.set('problem', problem.slug);
    window.history.replaceState({}, '', url);
  }, []);

  const closeProblem = useCallback(() => {
    setSelected(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('problem');
    window.history.replaceState({}, '', url);
  }, []);

  /* ----- other sections can request a case study (e.g. testimonial cards) ----- */
  useEffect(() => {
    const onRequest = (event: Event) => {
      const slug = (event as CustomEvent<string>).detail;
      const match = solvedProblems.find((p) => p.slug === slug);
      if (match) openProblem(match);
    };
    window.addEventListener(OPEN_PROBLEM_EVENT, onRequest);
    return () => window.removeEventListener(OPEN_PROBLEM_EVENT, onRequest);
  }, [openProblem]);

  /* ----- `/` focuses search, like a real console ----- */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
      const tag = (event.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      event.preventDefault();
      searchRef.current?.focus();
      searchRef.current?.scrollIntoView({ block: 'center' });
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return solvedProblems.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' || project.category === activeCategory;
      if (!matchesCategory) return false;
      if (!needle) return true;
      return (
        project.title.toLowerCase().includes(needle) ||
        project.summary.toLowerCase().includes(needle) ||
        project.problem.toLowerCase().includes(needle) ||
        project.solution.toLowerCase().includes(needle) ||
        project.outcome.toLowerCase().includes(needle)
      );
    });
  }, [activeCategory, query]);

  const isTruncated = !showAll && filtered.length > INITIAL_VISIBLE;
  const visible = isTruncated ? filtered.slice(0, INITIAL_VISIBLE) : filtered;
  const hasFilters = activeCategory !== 'All' || query.trim() !== '';

  const clearFilters = () => {
    setActiveCategory('All');
    setQuery('');
  };

  return (
    <section id="index" className="section-band section-divider relative">
      <div className="shell-width">
        {/* ---------- Section head ---------- */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-head"
        >
          <h2 className="section-title">Problems solved</h2>
          <p className="section-copy">
            Every entry is a real business problem, the system built to kill it, and what
            changed afterwards. {problemCount} of them. Search it like a database — press{' '}
            <kbd className="rounded border border-[var(--line)] bg-white/8 px-1.5 py-0.5 font-mono text-[0.7em]">
              /
            </kbd>
            .
          </p>

          <div className="relative mt-8 w-full max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--faint)]" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search problems…"
              aria-label="Search problems"
              className="text-input !pl-11 !pr-10 text-center"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--faint)] transition-colors hover:text-[var(--text)]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* ---------- Filters ---------- */}
        {/*
          Centring an overflowing flex row hides the leading chips with no way to
          scroll back to them, so the row only centres once it wraps instead of
          scrolls.
        */}
        <div className="hide-scrollbar mt-8 flex justify-start gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
          {categories.map((category) => {
            const count =
              category === 'All'
                ? solvedProblems.length
                : solvedProblems.filter((p) => p.category === category).length;
            const Icon = categoryIcon[category];
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setShowAll(false);
                }}
                data-active={activeCategory === category}
                data-category={category}
                className="chip inline-flex flex-shrink-0 items-center gap-1.5"
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                {category}
                <span className="font-mono text-[0.68em] opacity-55">{count}</span>
              </button>
            );
          })}
        </div>

        {/* ---------- Result meter ---------- */}
        <div className="mt-6 flex items-center justify-center gap-4 border-t border-[var(--line-soft)] pt-4">
          <span className="mono-tag">
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
            {hasFilters && ' · filtered'}
          </span>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="mono-tag inline-flex items-center gap-1.5 transition-colors hover:!text-[var(--text)]"
            >
              <SlidersHorizontal className="h-3 w-3" /> Reset
            </button>
          )}
        </div>

        {/* ---------- Grid ---------- */}
        {filtered.length > 0 ? (
          <>
            <motion.div
              layout={!reduce}
              className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visible.map((project, idx) => (
                  <motion.button
                    key={project.slug}
                    layout={!reduce}
                    initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.36,
                      delay: reduce ? 0 : Math.min(idx * 0.03, 0.24),
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    onClick={() => openProblem(project)}
                    data-category={project.category}
                    className="glass-card group flex h-full flex-col overflow-hidden text-center hover:-translate-y-1"
                  >
                    <div className="overflow-hidden border-b border-[var(--line-soft)]">
                      <WorkShot problem={project} />
                    </div>

                    <div className="flex flex-1 flex-col items-center p-6">
                      <CategoryBadge category={project.category} className="mb-3.5" />
                      <h3 className="text-[1.02rem] font-semibold leading-snug tracking-tight">
                        {project.title}
                      </h3>
                      <p className="clamp-3 mt-2.5 text-[0.84rem] leading-relaxed text-[var(--muted)]">
                        {project.summary}
                      </p>

                      <span className="secondary-button mt-6 !min-h-[2.4rem] !px-4 !text-[0.78rem] group-hover:border-[var(--line-strong)] group-hover:text-[var(--text)]">
                        Details <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>

            {isTruncated && (
              <div className="mt-10 flex justify-center">
                <button onClick={() => setShowAll(true)} className="secondary-button">
                  Show all {filtered.length} problems
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="glass-card mt-8 flex flex-col items-center justify-center px-6 py-20 text-center">
            <Search className="mb-4 h-9 w-9 text-[var(--faint)] opacity-40" />
            <p className="text-base font-medium">No problems match that</p>
            <p className="mt-1.5 text-sm text-[var(--muted)]">
              Try a different category or search term.
            </p>
            <button onClick={clearFilters} className="secondary-button mt-6">
              Clear filters
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <ProblemDetail problem={selected} onClose={closeProblem} />}
      </AnimatePresence>
    </section>
  );
}
