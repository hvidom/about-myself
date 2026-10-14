/// <reference types="vitest/config" />
// Unit + component tests. getViteConfig gives tests the same aliases, Tailwind-free
// Astro compiler and virtual modules (astro:content, Container API) as the site.
import { getViteConfig } from "astro/config";

export default getViteConfig({
	test: {
		include: ["test/**/*.test.ts"],
		environment: "node",
		restoreMocks: true,
	},
});
