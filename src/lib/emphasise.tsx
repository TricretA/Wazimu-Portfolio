import type { ReactNode } from 'react';

/**
 * The five palette hues, in the order they are dealt out. Prose that opts into
 * cycling walks this list so a long passage picks up colour without any single
 * accent taking over.
 */
const ACCENTS = [
  'text-[var(--blue)]',
  'text-[var(--success)]',
  'text-[var(--violet)]',
  'text-[var(--amber)]',
  'text-[var(--cyan)]'
];

interface Options {
  /**
   * Deal a different hue to each emphasised run. Off by default, which keeps
   * the single-accent treatment the insight posts already use.
   */
  cycle?: boolean;
  /** Accent when not cycling. */
  accent?: string;
}

/**
 * Renders `**wrapped**` runs as accented emphasis, plain text otherwise.
 *
 * `offset` lets a caller continue the hue cycle across separate paragraphs
 * instead of restarting it — otherwise every paragraph would open on blue.
 */
export function emphasise(
  paragraph: string,
  { cycle = false, accent = 'text-[var(--amber)]' }: Options = {},
  offset = 0
): { nodes: ReactNode[]; used: number } {
  let used = 0;

  const nodes = paragraph.split(/(\*\*[^*]+\*\*)/g).map((chunk, index) => {
    if (!chunk.startsWith('**')) return chunk;
    const className = cycle ? ACCENTS[(offset + used) % ACCENTS.length] : accent;
    used += 1;
    return (
      <strong key={index} className={`font-semibold ${className}`}>
        {chunk.slice(2, -2)}
      </strong>
    );
  });

  return { nodes, used };
}
