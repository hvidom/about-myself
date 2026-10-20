import { expect, test } from "@playwright/test";
import { expectNoHorizontalScroll, trackErrors } from "./helpers";

test.describe("home", () => {
	test("renders every section without errors", async ({ page }) => {
		const errors = trackErrors(page);
		await page.goto("/");

		await expect(page).toHaveTitle(/hvidom/);
		await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hryhorii Ilin");
		for (const name of [
			"The short version",
			"Professional journey",
			"Featured work",
			"Meet Merlin",
			"Areas of expertise",
			"Tech stack",
			"GitHub telemetry",
		]) {
			await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
		}
		await expect(page.locator('[data-lottie="/animations/hacker.lottie"]')).toBeVisible();
		await expectNoHorizontalScroll(page);
		expect(errors).toEqual([]);
	});

	test("the hero hacker and section Lotties load", async ({ page }) => {
		await page.goto("/");
		const hacker = page.locator('[data-lottie="/animations/hacker.lottie"] dotlottie-wc');
		await expect(hacker).toHaveAttribute("src", "/animations/hacker.lottie");
		await expect
			.poll(() =>
				hacker.evaluate(
					(el) => (el as HTMLElement & { dotLottie?: { isLoaded: boolean } }).dotLottie?.isLoaded,
				),
			)
			.toBe(true);
		await expect(page.locator('[data-lottie="/animations/hand.lottie"] dotlottie-wc')).toHaveCount(
			0,
		);
	});

	test("hero fits a 360px phone with every typewriter phrase", async ({ page }) => {
		await page.setViewportSize({ width: 360, height: 780 });
		await page.goto("/");
		const phrases: string[] = JSON.parse(
			(await page.locator("[data-typewriter]").getAttribute("data-phrases")) ?? "[]",
		);
		expect(phrases.length).toBeGreaterThan(1);
		for (const phrase of phrases) {
			const right = await page.evaluate((text) => {
				const target = document.querySelector("[data-typewriter-text]");
				if (target) target.textContent = text;
				const hero = document.querySelector("#hero-title")?.closest("section");
				return Math.max(
					...[...(hero?.querySelectorAll("*") ?? [])].map((el) => el.getBoundingClientRect().right),
				);
			}, phrase);
			expect(right, phrase).toBeLessThanOrEqual(360);
		}
	});

	test("quick clicks on the Merlin deck do not skip slides", async ({ page }) => {
		await page.goto("/");
		const deck = page.locator("[data-deck]");
		await deck.scrollIntoViewIfNeeded();
		const next = deck.getByRole("button", { name: "Next slide" });
		await next.click();
		await next.click();
		await next.click();
		await expect(deck.locator("[data-deck-count]")).toHaveText("04 / 06");
		const track = deck.locator("[data-deck-track]");
		await expect
			.poll(() => track.evaluate((t) => Math.round(t.scrollLeft / t.clientWidth)))
			.toBe(3);
	});

	test("Merlin deck pages with buttons and dots", async ({ page }) => {
		await page.goto("/");
		const deck = page.locator("[data-deck]");
		await deck.scrollIntoViewIfNeeded();
		const count = deck.locator("[data-deck-count]");
		await expect(count).toHaveText("01 / 06");
		await expect(deck.getByRole("button", { name: "Previous slide" })).toBeDisabled();
		await deck.getByRole("button", { name: "Next slide" }).click();
		await expect(count).toHaveText("02 / 06");
		await deck.getByRole("button", { name: /^Slide 6:/ }).click();
		await expect(count).toHaveText("06 / 06");
		await expect(deck.getByRole("button", { name: "Next slide" })).toBeDisabled();
		const track = deck.locator("[data-deck-track]");
		await expect
			.poll(() => track.evaluate((t) => Math.round(t.scrollLeft / t.clientWidth)))
			.toBe(5);
	});

	test("code snippets switch tabs by click and arrow keys", async ({ page }) => {
		await page.goto("/");
		const first = page.getByRole("tab", { name: "Step registry" });
		await expect(first).toHaveAttribute("aria-selected", "true");
		await expect(page.getByRole("tabpanel")).toContainText("SKILL_PORTS");
		await page.getByRole("tab", { name: "Run engine" }).click();
		await expect(page.getByRole("tabpanel")).toContainText("advanceRun");
		await page.keyboard.press("ArrowRight");
		await expect(page.getByRole("tab", { name: "AI intent step" })).toBeFocused();
		await expect(page.getByRole("tabpanel")).toContainText("intentNode");
	});

	test("source terminal types the command, then streams the file, at a fixed size", async ({
		page,
	}) => {
		await page.goto("/");
		const terminal = page.locator("[data-source]");
		const typed = page.getByRole("tabpanel").locator("[data-type]");
		await expect(typed).toHaveText("");
		await terminal.scrollIntoViewIfNeeded();
		await expect(typed).toHaveText("cat packages/types/src/merlin-skills.ts");
		await expect(page.getByRole("tabpanel")).not.toHaveAttribute("data-playing", /.*/, {
			timeout: 10_000,
		});
		const height = (await terminal.boundingBox())?.height;
		expect(height).toBeLessThan(560);

		await page.getByRole("tab", { name: "Run engine" }).click();
		await expect(page.getByRole("tabpanel")).toHaveAttribute("data-playing", "1");
		await expect(page.getByRole("tabpanel")).not.toHaveAttribute("data-playing", /.*/, {
			timeout: 10_000,
		});
		await expect(page.getByRole("tabpanel").locator("[data-type]")).toHaveText(
			"cat apps/api/src/lib/merlin-skills.ts",
		);
		expect((await terminal.boundingBox())?.height).toBe(height);
	});

	test("the sky toggle switches to the black sky and remembers it", async ({ page }) => {
		const errors = trackErrors(page);
		await page.goto("/");
		const html = page.locator("html");
		const toggle = page.getByRole("button", { name: "Black sky" });
		await expect(toggle).toHaveAttribute("aria-pressed", "false");
		await toggle.click();
		await expect(html).toHaveAttribute("data-sky", "black");
		await expect(toggle).toHaveAttribute("aria-pressed", "true");
		await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#050505");

		await page.reload();
		await expect(html).toHaveAttribute("data-sky", "black");
		await expect(page.getByRole("button", { name: "Black sky" })).toHaveAttribute(
			"aria-pressed",
			"true",
		);

		await page
			.getByRole("navigation", { name: "Main" })
			.getByRole("link", { name: "blog" })
			.click();
		await expect(page).toHaveURL(/\/blog\/$/);
		await expect(html).toHaveAttribute("data-sky", "black");

		await page.getByRole("button", { name: "Black sky" }).click();
		await expect(html).not.toHaveAttribute("data-sky", /.*/);
		expect(errors).toEqual([]);
	});

	test("terminal prompts keep their spaces", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator("#whoami")).toContainText("~ $ whoami");
		await expect(page.locator("#whoami")).toContainText("hvidom@dublin ~ $ neofetch");
	});

	test("typewriter cycles through the phrases", async ({ page }) => {
		await page.goto("/");
		const typed = page.locator("[data-typewriter-text]");
		const first = await typed.textContent();
		await expect(typed).not.toHaveText(first ?? "", { timeout: 8_000 });
	});

	test("typewriter stays still with reduced motion", async ({ page }) => {
		await page.emulateMedia({ reducedMotion: "reduce" });
		await page.goto("/");
		const typed = page.locator("[data-typewriter-text]");
		const first = await typed.textContent();
		await page.waitForTimeout(3_500);
		await expect(typed).toHaveText(first ?? "");
	});

	test("journey button jumps to the timeline", async ({ page }) => {
		await page.goto("/");
		await page.getByRole("link", { name: "Explore my journey" }).click();
		await expect(page).toHaveURL(/#journey$/);
		await expect(page.getByRole("heading", { name: "Professional journey" })).toBeInViewport();
	});

	test("external links open safely in a new tab", async ({ page }) => {
		await page.goto("/");
		const links = page.locator('a[target="_blank"]');
		expect(await links.count()).toBeGreaterThan(5);
		for (const rel of await links.evaluateAll((els) =>
			els.map((a) => a.getAttribute("rel") ?? ""),
		)) {
			expect(rel).toContain("noopener");
		}
	});

	test("skip link is the first stop for keyboard users", async ({ page, isMobile }) => {
		test.skip(isMobile, "no keyboard on mobile");
		await page.goto("/");
		await page.keyboard.press("Tab");
		const skip = page.getByRole("link", { name: "Skip to content" });
		await expect(skip).toBeFocused();
		await expect(skip).toBeVisible();
	});
});

test.describe("without JavaScript", () => {
	test.use({ javaScriptEnabled: false });

	test("the page is readable and no loader covers it", async ({ page }) => {
		await page.goto("/");
		await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
		await expect(page.locator("#global-preloader")).toBeHidden();
	});
});

test("scroll-to-top stays out of reach until the page is scrolled", async ({ page }) => {
	await page.goto("/");
	const button = page.getByRole("button", { name: "Scroll to top" });
	await expect(button).toBeHidden();
	await page.evaluate(() => window.scrollTo(0, 1500));
	await expect(button).toBeVisible();
	await button.click();
	await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
	await expect(button).toBeHidden();
});
