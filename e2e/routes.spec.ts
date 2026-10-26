import { expect, test } from "@playwright/test";
import { expectNoHorizontalScroll, trackErrors } from "./helpers";

const POST = "/blog/radio-king-platform-brief/";

test("the archive lists the first declassified file", async ({ page }) => {
	const errors = trackErrors(page);
	await page.goto("/blog/");
	await expect(page.getByRole("heading", { level: 1 })).toHaveText("Declassified files");
	const card = page.locator(`a[href="${POST}"]`);
	await expect(card).toContainText("TX-001");
	await expect(card).toContainText("the Radio King platform brief");
	await expectNoHorizontalScroll(page);
	expect(errors).toEqual([]);
});

test("the Radio King brief reads as a filed document", async ({ page }) => {
	const errors = trackErrors(page);
	await page.goto(POST);
	await expect(page.getByRole("heading", { level: 1 })).toHaveText(
		"Off WordPress, onto an owned stack: the Radio King platform brief",
	);
	await expect(page.getByText("File HVI-DOM-0001/TX-001").first()).toBeVisible();
	await expect(page.locator("figure")).toHaveCount(4);
	await expect(
		page.getByRole("img", { name: "System architecture of the Radio King platform" }),
	).toBeAttached();
	await expect(page.locator(".prose .table-wrap table").first()).toBeVisible();
	await expect(page.getByText("End of file · HVI-DOM-0001/TX-001")).toBeAttached();
	await expectNoHorizontalScroll(page);
	expect(errors).toEqual([]);
});

test("the post's links point at real sections and the social card is the cover", async ({
	page,
}) => {
	await page.goto(POST);
	for (const id of ["work", "merlin", "stack", "contact"]) {
		await expect(page.locator(`.prose a[href="/#${id}"]`).first()).toBeAttached();
	}
	await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
		"content",
		/^https:\/\/.+\.(jpg|jpeg|webp)$/,
	);
	await page.goto("/");
	for (const id of ["work", "merlin", "stack", "contact"]) {
		await expect(page.locator(`#${id}`)).toHaveCount(1);
	}
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

test("the RSS feed carries the published post", async ({ request }) => {
	const xml = await (await request.get("/rss.xml")).text();
	expect(xml).toContain(POST);
	expect(xml).not.toContain("/blog/first-post/");
});

test("feeds, sitemap and the social card are served", async ({ request }) => {
	for (const [path, type] of [
		["/rss.xml", "xml"],
		["/sitemap-index.xml", "xml"],
		["/og.jpg", "image/jpeg"],
		["/animations/on-rocket.lottie", "lottie"],
		["/animations/hacker.lottie", "lottie"],
	] as const) {
		const res = await request.get(path);
		expect(res.status(), path).toBe(200);
		expect(res.headers()["content-type"], path).toContain(type);
	}
});

test("pages are served with security headers", async ({ request }) => {
	for (const path of ["/", "/blog/"]) {
		const headers = (await request.get(path)).headers();
		expect(headers["x-content-type-options"], path).toBe("nosniff");
		expect(headers["x-frame-options"], path).toBe("DENY");
		expect(headers["referrer-policy"], path).toBe("strict-origin-when-cross-origin");
	}
});

test("the sitemap lists pages, not redirects", async ({ request }) => {
	const xml = await (await request.get("/sitemap-0.xml")).text();
	expect(xml).toContain("/blog/</loc>");
	expect(xml).toContain(`${POST}</loc>`);
	expect(xml).not.toMatch(/\/about\/?<\/loc>/);
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
