import { describe, expect, test } from "vitest";
import { ASTRONAUT, astronautSvg, rng, SHIP, sprite } from "@/lib/pixel";

describe("rng", () => {
	test("is deterministic for a seed", () => {
		const a = rng(42);
		const b = rng(42);
		expect(Array.from({ length: 5 }, a)).toEqual(Array.from({ length: 5 }, b));
	});

	test("returns values in [0, 1)", () => {
		const r = rng(7);
		for (let i = 0; i < 1000; i++) {
			const v = r();
			expect(v).toBeGreaterThanOrEqual(0);
			expect(v).toBeLessThan(1);
		}
	});
});

describe("sprite", () => {
	test("draws one rect per painted pixel and skips the rest", () => {
		const svg = sprite(["X.", ".X"], { X: "#fff" }, { px: 4 });
		expect(svg.match(/<rect /g)).toHaveLength(2);
		expect(svg).toContain('x="4" y="4" width="4" height="4"');
	});

	test("offsets by x/y", () => {
		expect(sprite(["X"], { X: "red" }, { x: 10, y: 20, px: 2 })).toContain('x="10" y="20"');
	});
});

describe("pixel art maps", () => {
	test("rows have equal width", () => {
		for (const map of [SHIP, ASTRONAUT]) {
			expect(new Set(map.map((row) => row.length)).size).toBe(1);
		}
	});

	test("astronaut svg is crisp and sized by pixel size", () => {
		const svg = astronautSvg(10);
		expect(svg).toContain('shape-rendering="crispEdges"');
		expect(svg).toContain(`viewBox="0 0 ${ASTRONAUT[0].length * 10} ${ASTRONAUT.length * 10}"`);
		expect(svg).toContain('aria-hidden="true"');
	});
});
