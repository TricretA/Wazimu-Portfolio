import { navigate, pathFor } from './route';

/**
 * Lets any section open a case study without lifting selection state into App.
 *
 * It used to be a custom DOM event that flipped a `useState` in the index.
 * Now it is a navigation: the URL becomes `/work/<slug>` and the history entry
 * is marked as an overlay, so the case study opens over the page exactly as it
 * did — but it can also be copied, shared, and reloaded into a real page.
 */
export function requestOpenProblem(slug: string) {
  navigate(pathFor.work(slug), { modal: true });
}
