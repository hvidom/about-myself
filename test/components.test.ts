import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, test } from "vitest";
import ClassificationBanner from "@/components/ClassificationBanner.astro";
import Decoder from "@/components/home/Decoder.astro";
import Hero from "@/components/home/Hero.astro";
import SectionHeading from "@/components/home/SectionHeading.astro";
import Terminal from "@/components/home/Terminal.astro";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cardVariants } from "@/components/ui/card";
import { DOM_TREE, FILE_ID } from "@/data/dossier";
import { NEOFETCH, PHRASES } from "@/data/profile";

let container: AstroContainer;
const text = (html: string) =>
	html
		.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, "")
		.replace(/<[^>]+>/g, "")
		.replace(/\s+/g, " ")
		.trim();

beforeAll(async () => {
	container = await AstroContainer.create();
});

describe("SectionHeading", () => {
	test("keeps the space between the prompt and the command (Astro 7 trims line-break whitespace)", async () => {
		const html = await container.renderToString(SectionHeading, {
			props: { eyebrow: "whoami", title: "The short version" },
		});
		expect(text(html)).toContain("~ $ whoami");
	});

	test("adds a Lottie on the right only when asked", async () => {
		const plain = await container.renderToString(SectionHeading, {
			props: { eyebrow: "x", title: "T" },
		});
		const animated = await container.renderToString(SectionHeading, {
			props: { eyebrow: "x", title: "T", animation: "/animations/dj.lottie" },
		});
		expect(plain).not.toContain("data-lottie");
		expect(animated).toContain('data-lottie="/animations/dj.lottie"');
	});

	test("shows the dossier file number only when given", async () => {
		const plain = await container.renderToString(SectionHeading, {
			props: { eyebrow: "whoami", title: "T" },
		});
		const filed = await container.renderToString(SectionHeading, {
			props: { eyebrow: "whoami", title: "T", file: "01" },
		});
		expect(text(plain)).not.toContain("File");
		expect(text(filed)).toMatch(/^~ \$ whoami/);
		expect(text(filed)).toContain("File 01");
	});

	test("renders the lead paragraph only when given", async () => {
		const without = await container.renderToString(SectionHeading, {
			props: { eyebrow: "x", title: "T" },
		});
		const withLead = await container.renderToString(SectionHeading, {
			props: { eyebrow: "x", title: "T" },
			slots: { default: "Lead text" },
		});
		expect(without).not.toContain('<p class="text-base');
		expect(text(withLead)).toContain("Lead text");
	});
});

describe("Hero", () => {
	test("one h1 and a readable subtitle", async () => {
		const html = await container.renderToString(Hero);
		expect(html.match(/<h1/g)).toHaveLength(1);
		expect(text(html)).toContain(
			"Full-stack developer · infrastructure tinkerer · ex-sales director",
		);
	});

	test("'Made in Ukraine' sits under the Dublin badge, both above the name", async () => {
		const plain = text(await container.renderToString(Hero));
		const dublin = plain.indexOf("Based in Dublin, Ireland");
		const ukraine = plain.indexOf("Made in Ukraine");
		expect(dublin).toBeGreaterThanOrEqual(0);
		expect(ukraine).toBeGreaterThan(dublin);
		expect(plain.indexOf("Hryhorii Ilin")).toBeGreaterThan(ukraine);
	});

	test("the hacker is back, as a decorative Lottie", async () => {
		const html = await container.renderToString(Hero);
		expect(html).toMatch(/data-lottie="\/animations\/hacker\.lottie"[^>]*aria-hidden="true"/);
	});

	test("screen readers get every phrase, the animated copy is hidden", async () => {
		const html = await container.renderToString(Hero);
		const srOnly = [...html.matchAll(/<span class="sr-only"[^>]*>([^<]*)<\/span>/g)].map(
			(m) => m[1],
		);
		expect(srOnly).toContain(PHRASES.join(". ").replaceAll("&", "&amp;"));
		expect(html).toMatch(
			/<span class="typing-box" aria-hidden="true"[^>]*>[\s\S]*?data-typing-text/,
		);
		expect(html).toMatch(/data-typewriter[^>]*>[\s\S]*?data-loop/);
	});
});

describe("Hero dossier", () => {
	test("files the subject under its number and spells out HVIDOM for screen readers", async () => {
		const html = await container.renderToString(Hero);
		const plain = text(html);
		expect(html).toMatch(new RegExp(`<dt[^>]*>File</dt>\\s*<dd[^>]*>${FILE_ID}</dd>`));
		expect(plain).toContain("hvidom stands for Hryhorii Victorovich Ilin, Document Object Model.");
		expect(plain.indexOf(FILE_ID)).toBeLessThan(plain.indexOf("Based in Dublin, Ireland"));
	});

	test("the redacted middle name is still in the markup, the stamp is decorative", async () => {
		const html = await container.renderToString(Hero);
		expect(html).toMatch(/data-redacted=""[^>]*>Victorovich<\/span>/);
		expect(html).toMatch(/class="stamp[^"]*"[^>]*aria-hidden="true"/);
	});
});

describe("Decoder", () => {
	test("one h2 and a link to every node of the document tree", async () => {
		const html = await container.renderToString(Decoder);
		expect(html.match(/<h2/g)).toHaveLength(1);
		for (const node of DOM_TREE) {
			expect(html).toContain(`href="${node.href}"`);
			expect(html).toContain(`aria-label="${node.tag}: ${node.label}"`);
		}
	});

	test("screen readers get each word once; the scrambling copy is hidden", async () => {
		const html = await container.renderToString(Decoder);
		expect(html).toContain('<span class="sr-only">Victorovich, patronymic</span>');
		expect(html).toMatch(
			/<span class="min-w-0" aria-hidden="true">\s*<span[^>]*data-decrypt="Victorovich"/,
		);
		expect(text(html)).toContain("Hryhorii Victorovich Ilin · Document Object Model");
	});
});

describe("ClassificationBanner", () => {
	test("reads as a note: formerly top secret, now declassified", async () => {
		const html = await container.renderToString(ClassificationBanner);
		expect(html).toContain('role="note"');
		expect(text(html)).toMatch(
			/^formerly TOP SECRET \/\/ HVIDOM \/\/ DECLASSIFIED FOR PUBLIC RELEASE/,
		);
	});
});

describe("Terminal", () => {
	test("lists every neofetch row and keeps the prompt spacing", async () => {
		const html = await container.renderToString(Terminal);
		const plain = text(html);
		for (const row of NEOFETCH) expect(plain).toContain(row.key);
		expect(plain).toContain("hvidom@dublin ~ $ neofetch");
	});

	test("the neofetch logo is the tea-break astronaut Lottie, decorative", async () => {
		const html = await container.renderToString(Terminal);
		expect(html).toMatch(/data-lottie="\/animations\/meditation\.lottie"[^>]*aria-hidden="true"/);
		expect(html).not.toContain('shape-rendering="crispEdges"');
	});
});

describe("shadcn variants", () => {
	test("brand button is the turquoise → green gradient", () => {
		expect(buttonVariants({ variant: "brand" })).toContain("from-turquoise");
		expect(buttonVariants({ variant: "brand" })).toContain("to-green");
	});

	test("palette badges and the glass card exist", () => {
		for (const variant of ["turquoise", "green", "violet", "pink", "gold", "chip"] as const) {
			expect(badgeVariants({ variant })).not.toBe(badgeVariants());
		}
		expect(cardVariants({ variant: "glass" })).toContain("backdrop-blur-md");
	});
});
