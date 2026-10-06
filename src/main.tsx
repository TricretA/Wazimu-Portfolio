import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;

const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);

/*
 * Every page is prerendered to real HTML at build time, so the normal path is
 * hydration — attach to what is already on screen rather than throwing it away
 * and rebuilding it, which would flash and undo the point of prerendering.
 *
 * `createRoot` stays as the fallback for the one case the build cannot cover:
 * an unknown path served by the host's SPA fallback, where the shell arrives
 * empty. Checking the container rather than a build flag means the right call
 * is made per page, with no way for the two to disagree.
 */
if (container.firstElementChild) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
