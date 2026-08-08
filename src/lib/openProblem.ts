/**
 * Lets any section ask the Problem Index to open a case study, without
 * lifting selection state into App or forcing a full page navigation.
 */
export const OPEN_PROBLEM_EVENT = 'wazimu:open-problem';

export function requestOpenProblem(slug: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_PROBLEM_EVENT, { detail: slug }));
}
