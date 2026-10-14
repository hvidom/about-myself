import { describe, expect, test, vi } from "vitest";
import { remarkReadingTime } from "../src/utils/remark-reading-time.mjs";
import { calculateReadingTime } from "../src/utils/wordsChecker";

describe("calculateReadingTime", () => {
	test("rounds up at 200 words per minute", () => {
		expect(calculateReadingTime("word ".repeat(200))).toBe("1");
		expect(calculateReadingTime("word ".repeat(201))).toBe("2");
	});

	test("empty text is a one-minute read", () => {
		expect(calculateReadingTime("")).toBe("1");
	});
});

test("remark plugin writes minutesRead into frontmatter", () => {
	vi.spyOn(console, "log").mockImplementation(() => {});
	const tree = { type: "root", children: [{ type: "text", value: "word ".repeat(450) }] };
	const file: { path: string; data: { astro?: { frontmatter: Record<string, unknown> } } } = {
		path: "post.mdx",
		data: {},
	};
	remarkReadingTime()(tree, file);
	expect(file.data.astro?.frontmatter.minutesRead).toBe("3 min read");
});
