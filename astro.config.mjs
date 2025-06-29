import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://apr-artist-agency.pages.dev',
  adapter: cloudflare({
    mode: 'directory'
  }),
  integrations: [
    tailwind({
      config: { darkMode: 'class' },
    }),
    mdx(),
    react(),
    markdoc(),
    keystatic(),
  ],
  build: {
    assets: '_assets'
  },
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  viewTransitions: true,
  vite: {
    define: {
      global: 'globalThis'
    }
  }
});
