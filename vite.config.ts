import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    build: {
      /*
       * Four entries, not one. `/privacy`, `/terms` and `/data` are required
       * at real URLs by platform reviewers (Meta's WhatsApp API among them),
       * and building them as static files means the URLs resolve on any host
       * without an SPA rewrite rule. Each still boots the same app — the
       * router in `src/lib/route.ts` picks the page off the pathname.
       */
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          privacy: path.resolve(__dirname, 'privacy/index.html'),
          terms: path.resolve(__dirname, 'terms/index.html'),
          data: path.resolve(__dirname, 'data/index.html')
        }
      }
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
