// Governing: ADR-0001 (Astro 5 + Tailwind CSS static site), ADR-0002 (EN/DE subpath routing)
// Implements: SPEC-0001 REQ "Bilingual Navigation and Localized SEO Routing", SPEC-0001 REQ "GitHub Pages Static Build and CI/CD Deployment", SPEC-0002 REQ "Localized Collection Listing and Detail Routes"

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://futureware.ch',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          de: 'de',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: 'esnext',
    },
  },
});
