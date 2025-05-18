import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://thealanrajendram.github.io',
  base: '/webapp-test',
  integrations: [
    tailwind({
      config: { darkMode: 'class' }
    }),
    mdx()
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
  viewTransitions: true
});
