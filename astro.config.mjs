import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://thealanrajendram.github.io',
  base: '/.',
  integrations: [tailwind({
    config: { darkMode: 'class' }
  }), mdx(), react(), markdoc(), keystatic()],
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
  viewTransitions: true
});
