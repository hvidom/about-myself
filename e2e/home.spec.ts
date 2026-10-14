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
			"Areas of expertise",
			"Tech stack",
			"GitHub telemetry",
		]) {
			await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
		}
		await expect(page.getByRole("img", { name: /spaceship shoots down squares/ })).toBeVisible();
		await expectNoHorizontalScroll(page);
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
