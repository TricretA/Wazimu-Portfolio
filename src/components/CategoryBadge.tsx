import { categoryIcon, type ProblemCategory } from '../data/problems';

interface Props {
  category: ProblemCategory;
  className?: string;
}

/**
 * Category tag for a work card or case study. Colour comes from the `--cat`
 * variable that `[data-category]` sets on an ancestor, so this stays a plain
 * label wherever it is dropped.
 */
export default function CategoryBadge({ category, className = '' }: Props) {
  const Icon = categoryIcon[category];

  return (
    <span className={`cat-badge ${className}`.trim()}>
      <Icon strokeWidth={2.2} aria-hidden="true" />
      {category}
    </span>
  );
}
