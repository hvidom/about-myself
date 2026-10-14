import { expect, test } from "vitest";
import { iconColor, luminance } from "@/lib/icon-color";

test("luminance spans black to white", () => {
	expect(luminance("000000")).toBe(0);
	expect(luminance("FFFFFF")).toBeCloseTo(1, 5);
});

test("black brand logos use the text colour on the dark sky", () => {
	for (const hex of ["000000", "181717", "0A0A0A", "191919"])
		expect(iconColor(hex)).toBe("currentColor");
});

test("coloured logos keep their brand colour", () => {
	expect(iconColor("3178C6")).toBe("#3178C6");
	expect(iconColor("#F38020")).toBe("#F38020");
});
