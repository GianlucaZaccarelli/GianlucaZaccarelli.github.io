// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://gianlucazaccarelli.github.io',

  // CSS incorporato nell'HTML: ~17 KB compressi, niente fogli che bloccano il primo disegno
  build: {
    inlineStylesheets: 'always',
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/cv-print'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
