import { readFileSync } from "node:fs";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, test } from "vitest";
import Header from "@/components/Header.astro";
import Contact from "@/components/home/Contact.astro";
import Hero from "@/components/home/Hero.astro";
import Merlin from "@/components/home/Merlin.astro";
import SectionHeading from "@/components/home/SectionHeading.astro";
import Highlighter from "@/components/magic/Highlighter.astro";
import { MERLIN_SNIPPETS } from "@/data/profile";
import { brandCodeTheme } from "@/lib/code-theme";

let container: AstroContainer;
const render = async (...args: Parameters<AstroContainer["renderToString"]>) =>
	(await container.renderToString(...args)).replace(/ data-astro-cid-\w+(="[^"]*")?/g, "");
const text = (html: string) =>
	html
		.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, "")
		.replace(/<[^>]+>/g, "")
		.replace(/\s+/g, " ")
		.trim();

beforeAll(async () => {
	container = await AstroContainer.create();
});

describe("source terminal", () => {
	let html: string;
	beforeAll(async () => {
		html = await render(Merlin);
	});

	test("stacks every file in one grid cell; only the first is shown", () => {
		const panels = [...html.matchAll(/<div role="tabpanel"[^>]*>/g)].map((m) => m[0]);
		expect(panels).toHaveLength(MERLIN_SNIPPETS.length);
		expect(panels[0]).not.toMatch(/invisible|inert/);
		for (const panel of panels.slice(1)) {
			expect(panel).toContain("invisible");
			expect(panel).toContain("inert");
		}
		for (const panel of panels) expect(panel).toContain("col-start-1 row-start-1");
	});

	test("each tab types `cat <path>` and screen readers get the command once", () => {
		for (const { path } of MERLIN_SNIPPETS) {
			expect(html).toContain(`<span class="sr-only">cat ${path}</span>`);
			expect(html).toContain(`data-type="cat ${path}"`);
		}
	});

	test("reports the real line count of every file", () => {
		for (const { id } of MERLIN_SNIPPETS) {
			const file = readFileSync(
				new URL(`../src/data/merlin-snippets/${id}.ts.txt`, import.meta.url),
				"utf8",
			);
			expect(text(html)).toContain(`✔ ${file.trimEnd().split("\n").length} lines of TypeScript`);
		}
	});

	test("code is coloured with site tokens, not the placeholder hexes", () => {
		expect(html).toContain("color:var(--violet)");
		expect(html).toContain("color:var(--turquoise)");
		for (const placeholder of Object.keys(brandCodeTheme.colorReplacements ?? {})) {
			expect(html.toLowerCase()).not.toContain(placeholder);
		}
	});
});

describe("sky toggle", () => {
	test("is a toggle button in the header, on phones too", async () => {
		const html = await render(Header);
		const button = html.match(/<button[^>]*data-sky-toggle[^>]*>/)?.[0] ?? "";
		expect(button).toContain('aria-label="Black sky"');
		expect(button).toContain('aria-pressed="false"');
		expect(button).not.toMatch(/\bhidden\b/);
	});

	test("the stored sky is applied before the first paint", () => {
		const head = readFileSync(
			new URL("../src/components/layouts/BaseHead.astro", import.meta.url),
			"utf8",
		);
		expect(head).toMatch(
			/<script is:inline>[\s\S]*localStorage\.getItem\("sky"\)[\s\S]*astro:after-swap/,
		);
	});
});

describe("text effects", () => {
	test("section titles keep their text inside the Dia sweep", async () => {
		const html = await render(SectionHeading, {
			props: { eyebrow: "x", title: "Tech stack", id: "t" },
		});
		expect(html).toMatch(
			/<h2 id="t"[^>]*><span class="dia-text"[^>]*data-dia[^>]*>Tech stack<\/span>/,
		);
	});

	test("the hero subtitle is read once, without the separators", async () => {
		const html = await render(Hero);
		expect(html).toContain(
			'<span class="sr-only">Full-stack developer, infrastructure tinkerer, ex-sales director</span>',
		);
		expect(html).toMatch(/<span aria-hidden="true">\s*<span class="text-animate-word/);
	});

	test("contact heading has one readable sentence; the morphing word is decorative", async () => {
		const html = await render(Contact);
		expect(html).toContain(
			'<span class="sr-only">Let’s build something that ships, scales and sells.</span>',
		);
		expect(html).toMatch(
			/class="morphing-text[^"]*"[^>]*aria-hidden="true"[^>]*data-morph="\[&quot;ships\.&quot;/,
		);
		expect(html).toContain("neon-card");
	});

	test("highlighter keeps the phrase as plain text", async () => {
		const html = await render(Highlighter, {
			props: { action: "underline", tone: "green" },
			slots: { default: "in production" },
		});
		expect(html).toMatch(
			/<span data-highlight="underline" data-tone="green"[^>]*>in production<\/span>/,
		);
	});
});
