import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://thealanrajendram.github.io',
  base: '/webapp-test',
  integrations: [tailwind(), mdx()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark'
    }
  },
  build: {
    assets: '_assets'
  },
  trailingSlash: 'always',
  output: 'static'
});
