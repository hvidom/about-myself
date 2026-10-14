import { expect, type Page } from "@playwright/test";

/** Collects console errors and uncaught exceptions for the page. */
export function trackErrors(page: Page) {
	const errors: string[] = [];
	page.on("pageerror", (e) => errors.push(String(e)));
	page.on("console", (m) => {
		// Remote badges (daily.dev, Holopin, GitHub raw) may be blocked or slow; they are not our code.
		if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text());
	});
	return errors;
}

/** The page never scrolls sideways. */
export async function expectNoHorizontalScroll(page: Page) {
	const overflow = await page.evaluate(
		() => document.documentElement.scrollWidth - window.innerWidth,
	);
	expect(overflow).toBeLessThanOrEqual(0);
}
