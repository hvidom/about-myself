/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
	test: {
		include: ["test/**/*.test.ts"],
		environment: "node",
		restoreMocks: true,
	},
});
