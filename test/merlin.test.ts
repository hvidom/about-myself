import { readdirSync, readFileSync } from "node:fs";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, test } from "vitest";
import MerlinVisual from "@/components/home/MerlinVisual.astro";
import {
	EXPERTISE,
	MERLIN_BLOCKS,
	MERLIN_SLIDES,
	MERLIN_SNIPPETS,
	MERLIN_STATS,
	MERLIN_TOOLS,
	TONE,
} from "@/data/profile";

const dir = new URL("../src/data/merlin-snippets/", import.meta.url);
const stat = (label: string) => Number(MERLIN_STATS.find((s) => s.label === label)?.value);

describe("Merlin deck", () => {
	test("the numbers on the page match the lists behind them", () => {
		expect(MERLIN_TOOLS).toHaveLength(stat("chat tools"));
		expect(MERLIN_BLOCKS.flatMap((b) => b.steps)).toHaveLength(stat("skill steps"));
		expect(new Set(MERLIN_TOOLS).size).toBe(MERLIN_TOOLS.length);
	});

	test("the slide copy quotes the same numbers", () => {
		const copy = MERLIN_SLIDES.map((s) => `${s.title} ${s.text}`).join(" ");
		expect(copy).toContain(`${stat("chat tools")} tools`);
		expect(copy).toContain(`${stat("skill steps")} building blocks`);
		expect(copy).toContain(`${stat("emotions")} emotions`);
	});

	test("every slide renders a non-empty visual", async () => {
		const container = await AstroContainer.create();
		expect(new Set(MERLIN_SLIDES.map((s) => s.visual)).size).toBe(MERLIN_SLIDES.length);
		for (const slide of MERLIN_SLIDES) {
			expect(TONE[slide.tone]).toBeDefined();
			const html = await container.renderToString(MerlinVisual, {
				props: { visual: slide.visual },
			});
			const text = html.replace(/<style[\s\S]*?<\/style>|<[^>]+>/g, "").trim();
			expect(text.length, slide.visual).toBeGreaterThan(20);
		}
	});
});

describe("Merlin snippets", () => {
	const files = readdirSync(dir);

	test("every tab has a file and every file has a tab", () => {
		const ids = MERLIN_SNIPPETS.map((s) => `${s.id}.ts.txt`).sort();
		expect(files.sort()).toEqual(ids);
	});

	test("contain nothing personal or business-specific", () => {
		for (const file of files) {
			const code = readFileSync(new URL(file, dir), "utf8");
			expect(code, file).not.toMatch(/radio\s?king|kommo|dublin|@[\w-]+\.\w+|https?:\/\//i);
			expect(code, file).not.toMatch(/\+?\d[\d\s-]{8,}\d/); // phone numbers
			expect(code, file).not.toMatch(/[а-яё]/i); // comments are translated
		}
	});
});

test("every Lottie referenced in src exists in public/animations", () => {
	const src = new URL("../src/", import.meta.url);
	const animations = new Set(readdirSync(new URL("../public/animations/", import.meta.url)));
	const used = new Set<string>();
	for (const file of readdirSync(src, { recursive: true, encoding: "utf8" })) {
		if (!/\.(astro|ts)$/.test(file)) continue;
		for (const m of readFileSync(new URL(file, src), "utf8").matchAll(
			/\/animations\/([\w-]+\.lottie)/g,
		)) {
			used.add(m[1] as string);
		}
	}
	expect(used.size).toBeGreaterThan(EXPERTISE.length);
	for (const name of used) expect(animations.has(name), name).toBe(true);
});
