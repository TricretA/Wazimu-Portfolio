import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],

    build: {
      /*
       * One HTML entry, not four.
       *
       * The site used to hand-maintain a separate `index.html` per URL, which
       * worked at four pages and does not at sixty-six. Every page is now
       * written by `scripts/prerender.mjs`, which takes this build's output as
       * its template — so the hashed asset names are always current and the
       * head is generated from the same data the page renders.
       *
       * The SSR pass is driven from the command line rather than from here
       * (`vite build --ssr src/entry-server.tsx --outDir .ssr`), because the
       * two builds want different entries and different output directories,
       * and branching on `isSsrBuild` inside one config object is the kind of
       * cleverness that fails silently. It builds into a throwaway `.ssr/`
       * that the prerender and SEO scripts import and then delete.
       */
      outDir: 'dist',
      emptyOutDir: true
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.')
      }
    },

    server: {
      // HMR is disabled in AI Studio via the DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true'
    }
  };
});
