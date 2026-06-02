// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from "rehype-external-links";
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
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            content: {
              type: "text",
              value: " 🔗",
            },
            target: "_blank",
            rel: ["nofollow", "noreferrer"],
          },
        ],
      ],
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
  vite: {
    plugins: [tailwindcss()],
  },
});