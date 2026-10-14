import { expect, type Page } from "@playwright/test";

export function trackErrors(page: Page) {
	const errors: string[] = [];
	page.on("pageerror", (e) => errors.push(String(e)));
	page.on("response", (r) => {
		const local = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(r.url());
		if (local && r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
	});
	page.on("console", (m) => {
		if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text());
	});
	return errors;
}

export async function expectNoHorizontalScroll(page: Page) {
	const overflow = await page.evaluate(
		() => document.documentElement.scrollWidth - window.innerWidth,
	);
	expect(overflow).toBeLessThanOrEqual(0);
}
