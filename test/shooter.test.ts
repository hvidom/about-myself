import { describe, expect, test } from "vitest";
import { shooterSvg } from "@/lib/shooter";

const svg = shooterSvg();
const css = svg.match(/<style>([\s\S]*)<\/style>/)?.[1] ?? "";

describe("contribution radar", () => {
	test("is deterministic, so builds do not change the markup", () => {
		expect(shooterSvg()).toBe(svg);
	});

	test("has an accessible name", () => {
		expect(svg).toMatch(/role="img" aria-label="[^"]+"/);
	});

	test("every class is prefixed, because inline <style> applies to the whole page", () => {
		const classes = [...svg.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1]!.split(/\s+/));
		const own = classes.filter((c) => !["h-auto", "w-full"].includes(c));
		expect(own.length).toBeGreaterThan(0);
		for (const c of own) expect(c).toMatch(/^ms-/);
	});

	test("every CSS selector and keyframe is prefixed", () => {
		const selectors = [...css.matchAll(/(?:^|\})\s*([.@][^{]+)\{/g)].map((m) => m[1]!.trim());
		for (const s of selectors) {
			if (s.startsWith("@media")) continue;
			expect(s).toMatch(/^(\.ms-|@keyframes ms-)/);
		}
	});

	test("fires five bolts, each with its own pop and target cell", () => {
		for (let k = 0; k < 5; k++) {
			expect(svg).toContain(`class="ms-bolt${k}"`);
			expect(svg).toContain(`class="ms-pop${k}"`);
			expect(svg).toContain(`class="ms-cell${k}"`);
		}
	});

	test("respects prefers-reduced-motion", () => {
		expect(css).toContain("@media (prefers-reduced-motion: reduce)");
	});

	test("keyframe percentages stay within 0–100%", () => {
		for (const m of css.matchAll(/(-?\d+(?:\.\d+)?)%\{/g)) {
			const v = Number(m[1]);
			expect(v).toBeGreaterThanOrEqual(0);
			expect(v).toBeLessThanOrEqual(100);
		}
	});
});
