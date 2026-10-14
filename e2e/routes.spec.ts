import { expect, test } from "@playwright/test";
import { expectNoHorizontalScroll, trackErrors } from "./helpers";

test("blog shows the empty state while posts are drafts", async ({ page }) => {
	const errors = trackErrors(page);
	await page.goto("/blog/");
	await expect(page.getByRole("heading", { level: 1 })).toHaveText("Writing & insights");
	await expect(page.getByText("first posts are being written")).toBeVisible();
	await expectNoHorizontalScroll(page);
	expect(errors).toEqual([]);
});

test("draft posts are not published", async ({ request }) => {
	expect((await request.get("/blog/first-post/")).status()).toBe(404);
});

test("/about redirects to the whoami section", async ({ page }) => {
	await page.goto("/about");
	await expect(page).toHaveURL(/\/#whoami$/);
});

test("unknown pages return 404", async ({ request }) => {
	expect((await request.get("/definitely-not-here/")).status()).toBe(404);
});

test("feeds, sitemap and the social card are served", async ({ request }) => {
	for (const [path, type] of [
		["/rss.xml", "xml"],
		["/sitemap-index.xml", "xml"],
		["/og.jpg", "image/jpeg"],
		["/animations/on-rocket.lottie", "lottie"],
	] as const) {
		const res = await request.get(path);
		expect(res.status(), path).toBe(200);
		expect(res.headers()["content-type"], path).toContain(type);
	}
});

test("head has canonical, description and an absolute social image", async ({ page }) => {
	await page.goto("/");
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\//);
	await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);
	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
		"content",
		/^https:\/\/.+\/og\.jpg$/,
	);
	await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("fonts are self-hosted", async ({ page }) => {
	const fonts: string[] = [];
	page.on("response", (r) => {
		if (r.request().resourceType() === "font") fonts.push(new URL(r.url()).host);
	});
	await page.goto("/");
	await page.evaluate(() => document.fonts.ready);
	expect(fonts.length).toBeGreaterThan(0);
	for (const host of fonts) expect(host).toMatch(/^localhost:/);
});
