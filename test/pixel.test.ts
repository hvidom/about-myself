import { describe, expect, test } from "vitest";
import { ASTRONAUT, astronautSvg, sprite } from "@/lib/pixel";

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
		expect(new Set(ASTRONAUT.map((row) => row.length)).size).toBe(1);
	});

	test("astronaut svg is crisp and sized by pixel size", () => {
		const svg = astronautSvg(10);
		expect(svg).toContain('shape-rendering="crispEdges"');
		expect(svg).toContain(`viewBox="0 0 ${ASTRONAUT[0].length * 10} ${ASTRONAUT.length * 10}"`);
		expect(svg).toContain('aria-hidden="true"');
	});
});
