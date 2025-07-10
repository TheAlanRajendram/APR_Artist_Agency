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
  output: 'static',
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
    assets: '_assets',
    inlineStylesheets: 'auto'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover'
  },
  image: {
    domains: ['apr-artist-agency.pages.dev'],
    remotePatterns: [{
      protocol: 'https'
    }]
  },
  viewTransitions: true,
  vite: {
    define: {
      global: 'globalThis'
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom'],
            'cms': ['@keystatic/core', '@keystatic/astro']
          }
        }
      }
    },
    ssr: {
      noExternal: ['@keystatic/core', '@keystatic/astro']
    }
  }
});
