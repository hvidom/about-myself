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
