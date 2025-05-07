import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://thealanrajendram.github.io',
  base: '/webapp-test',
  integrations: [tailwind(), mdx()],
  build: {
    assets: '_assets'
  },
  output: 'static'
});
