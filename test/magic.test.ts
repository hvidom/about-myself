import { readFileSync } from "node:fs";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, test } from "vitest";
import Header from "@/components/Header.astro";
import Contact from "@/components/home/Contact.astro";
import FactoryBeams from "@/components/home/FactoryBeams.astro";
import Hero from "@/components/home/Hero.astro";
import Merlin from "@/components/home/Merlin.astro";
import SectionHeading from "@/components/home/SectionHeading.astro";
import AnimatedBeam from "@/components/magic/AnimatedBeam.astro";
import Highlighter from "@/components/magic/Highlighter.astro";
import Redacted from "@/components/magic/Redacted.astro";
import Stamp from "@/components/magic/Stamp.astro";
import TypingAnimation from "@/components/magic/TypingAnimation.astro";
import { CF_FLOW, MERLIN_SNIPPETS } from "@/data/profile";
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

describe("dossier effects", () => {
	test("redacted text ships readable; only the script arms the bar", async () => {
		const html = await render(Redacted, { slots: { default: "confidential" } });
		expect(html).toMatch(
			/<span class="redacted" data-redacted="" data-delay="0">confidential<\/span>/,
		);
	});

	test("the stamp is decorative and inked in the chosen tone", async () => {
		const html = await render(Stamp, { props: { text: "Declassified", tone: "gold", tilt: 5 } });
		expect(html).toContain('aria-hidden="true"');
		expect(html).toContain("--tone: var(--gold); --tilt: 5deg");
		expect(text(html)).toBe("Declassified");
	});
});

describe("typing animation", () => {
	test("ships the full text, readable once; the typed copy is decorative", async () => {
		const html = await render(TypingAnimation, {
			props: { text: "cat ~/journey.log", cursor: "block" },
		});
		expect(html).toContain('<span class="sr-only">cat ~/journey.log</span>');
		expect(html).toMatch(
			/<span class="typing-box"[^>]*aria-hidden="true"[^>]*>[\s\S]*?data-typing-text>cat ~\/journey\.log<\/span>/,
		);
		expect(html).toMatch(/ data-on-view[ >]/);
		expect(html).toContain("typing-cursor-block");
		expect(html).not.toContain("data-loop");
	});

	test("words loop on request and reserve room for the longest one", async () => {
		const html = await render(TypingAnimation, {
			props: { words: ["ships", "scales well"], loop: true, startOnView: false },
		});
		expect(html).toContain('data-words="[&quot;ships&quot;,&quot;scales well&quot;]"');
		expect(html).toContain('data-reserve="scales well"');
		expect(html).toMatch(/ data-loop[ >]/);
		expect(html).not.toContain("data-on-view");
		expect(html).toContain('<span class="sr-only">ships. scales well</span>');
	});

	test("cursor: none renders no cursor", async () => {
		const html = await render(TypingAnimation, { props: { text: "x", cursor: "none" } });
		expect(html).not.toContain("typing-cursor");
	});
});

describe("animated beam", () => {
	test("is a decorative overlay that names both ends and pulses along the path", async () => {
		const html = await render(AnimatedBeam, {
			props: {
				from: "a",
				to: "b",
				curvature: 20,
				reverse: true,
				fromSide: "right",
				start: "green",
				stop: "violet",
			},
		});
		expect(html).toMatch(/<svg[^>]*aria-hidden="true"[^>]*data-beam/);
		expect(html).toContain('data-from="a"');
		expect(html).toContain('data-to="b"');
		expect(html).toContain('data-curvature="20"');
		expect(html).toContain('data-from-side="right"');
		expect(html).toContain("stop-color: var(--green)");
		expect(html).toContain("stop-color: var(--violet)");
		expect(html.match(/pathLength="1"/g)).toHaveLength(2);
		expect(html).toContain("beam-reverse");
		expect(html).toContain('class="beam-track"');
	});

	test("the track is optional", async () => {
		const html = await render(AnimatedBeam, { props: { from: "a", to: "b", track: false } });
		expect(html).not.toContain("beam-track");
	});

	test("the Content Factory diagram beams every channel in and every service out", async () => {
		const html = await render(FactoryBeams);
		const beams = [...html.matchAll(/data-from="([^"]+)" data-to="([^"]+)"/g)].map(
			(m) => `${m[1]}>${m[2]}`,
		);
		expect(beams).toHaveLength(CF_FLOW.inputs.length + CF_FLOW.outputs.length);
		CF_FLOW.inputs.forEach((_, i) => {
			expect(beams).toContain(`in-${i}>hub`);
		});
		CF_FLOW.outputs.forEach((_, i) => {
			expect(beams).toContain(`hub>out-${i}`);
		});
		for (const id of ["hub", "in-0", "out-4"]) expect(html).toContain(`data-beam-node="${id}"`);
		expect(text(html)).toContain(`flow into ${CF_FLOW.hub}`);
	});
});
