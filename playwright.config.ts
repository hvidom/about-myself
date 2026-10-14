import { defineConfig, devices } from "@playwright/test";

// E2E against the real build running in workerd (wrangler dev --local), like production.
const PORT = 4330;

export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 2 : undefined,
	reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
	timeout: 30_000,
	expect: { timeout: 7_000 },

	use: {
		baseURL: `http://localhost:${PORT}`,
		trace: "on-first-retry",
		screenshot: "only-on-failure",
		locale: "en-IE",
		timezoneId: "Europe/Dublin",
		colorScheme: "dark",
	},

	projects: [
		{ name: "desktop", use: { ...devices["Desktop Chrome"] } },
		{ name: "mobile", use: { ...devices["Pixel 7"] } },
	],

	webServer: {
		command: `bun run build && bunx wrangler dev --port ${PORT} --local`,
		url: `http://localhost:${PORT}/`,
		reuseExistingServer: !process.env.CI,
		timeout: 180_000,
		stdout: "ignore",
		stderr: "pipe",
	},
});
