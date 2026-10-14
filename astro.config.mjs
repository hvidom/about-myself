// @ts-check

import cloudflare from "@astrojs/cloudflare";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
	site: "https://about-myself.devopsick.workers.dev",
	prefetch: {
		prefetchAll: true,
	},
	// MDX extends this config, so blog posts (.mdx) get the same processor and Shiki theme.
	markdown: {
		processor: unified({
			remarkPlugins: [remarkReadingTime],
		}),
		shikiConfig: {
			theme: "github-dark-dimmed",
			wrap: true,
		},
	},
	integrations: [mdx(), sitemap({ entryLimit: 10000 }), react()],
	fonts: [
		{
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
		},
		{
			provider: fontProviders.fontsource(),
			name: "JetBrains Mono",
			cssVariable: "--font-jetbrains-mono",
			weights: ["100 800"],
			styles: ["normal"],
			subsets: ["latin"],
			fallbacks: ["monospace"],
		},
	],
	adapter: cloudflare({
		imageService: "compile",
	}),
	output: "server",
	server: {
		port: 4321,
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
