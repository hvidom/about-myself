// .astro components rendered with the Container API.
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, test } from "vitest";
import Hero from "@/components/home/Hero.astro";
import SectionHeading from "@/components/home/SectionHeading.astro";
import Terminal from "@/components/home/Terminal.astro";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cardVariants } from "@/components/ui/card";
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

	test("screen readers get every phrase, the animated copy is hidden", async () => {
		const html = await container.renderToString(Hero);
		expect(html).toContain(
			`<span class="sr-only">${PHRASES.join(". ").replaceAll("&", "&amp;")}</span>`,
		);
		expect(html).toMatch(/aria-hidden="true" data-typewriter-text/);
	});
});

describe("Terminal", () => {
	test("lists every neofetch row and keeps the prompt spacing", async () => {
		const html = await container.renderToString(Terminal);
		const plain = text(html);
		for (const row of NEOFETCH) expect(plain).toContain(row.key);
		expect(plain).toContain("hvidom@dublin ~ $ neofetch");
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
