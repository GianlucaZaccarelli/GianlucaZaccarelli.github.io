// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Sostituisci con il tuo URL GitHub Pages:
  // - Se la repo si chiama "username.github.io" → site: 'https://username.github.io'
  // - Se si chiama diversamente → site: 'https://username.github.io', base: '/nome-repo'
  site: 'https://gianlucazaccarelli.github.io',

  vite: {
    plugins: [tailwindcss()],
  },
});
