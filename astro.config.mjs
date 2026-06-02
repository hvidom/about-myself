// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";
// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  prefetch: {
		prefetchAll: true
	},
  integrations: [mdx({
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true
    },
    gfm: true
  }), 
  sitemap({
    entryLimit: 10000,
  }),
   react()],
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed", 
      wrap: true, 
    },
    processor: unified({
      gfm: true,
      remarkPlugins: [remarkReadingTime],
    }),
  },
  fonts: [{
    provider: fontProviders.local(),
    name: "Inter",
    cssVariable: "--font-inter",
    options: {
      variants: [
        {
          weight: "100 900",
          style: "normal",
          src: ["./src/assets/fonts/InterVariable.woff2"],
        },
      ],
    },
  }],

  adapter: cloudflare(),
  output: "server",
  server: {
    port: 4321,
  },
  experimental: {
    advancedRouting: true,
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning.code === 'EVAL' && 
            warning.id && 
            warning.id.includes('@dotlottie/player-component')
          ) {
            return;
          }
          warn(warning);
        }
      }
    }
  },
});