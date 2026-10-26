import { describe, expect, test } from "vitest";
import {
	ACRONYM,
	BANNER,
	CODENAME,
	DOM_TREE,
	FILE_ID,
	fileOf,
	SUBJECT,
	transmissionId,
} from "@/data/dossier";
import { TONE } from "@/data/profile";
import { rehypeTableWrap } from "../src/utils/rehype-table-wrap.mjs";

describe("HVIDOM", () => {
	test("the six letters spell the codename and expand to the full name", () => {
		expect(ACRONYM.map((a) => a.letter).join("")).toBe(CODENAME);
		for (const { letter, word } of ACRONYM) expect(word.startsWith(letter)).toBe(true);
		const subject = ACRONYM.filter((a) => a.half === "subject").map((a) => a.word);
		const model = ACRONYM.filter((a) => a.half === "model").map((a) => a.word);
		expect(subject.join(" ")).toBe("Hryhorii Victorovich Ilin");
		expect(model.join(" ")).toBe("Document Object Model");
	});

	test("the dossier redacts only words that are really in the value", () => {
		for (const { value, redact } of SUBJECT) if (redact) expect(value).toContain(redact);
		expect(SUBJECT.find((s) => s.key === "File")?.value).toBe(FILE_ID);
	});

	test("the classification banner is struck through, then declassified", () => {
		expect(BANNER.struck).toBe("TOP SECRET");
		expect(BANNER.full).toContain("DECLASSIFIED");
		expect(BANNER.full.length).toBeGreaterThan(BANNER.short.length);
	});
});

describe("document tree", () => {
	test("files are numbered 01, 02, … in order, and every tone exists", () => {
		DOM_TREE.forEach((node, i) => {
			expect(node.file).toBe(String(i + 1).padStart(2, "0"));
			expect(TONE[node.tone]).toBeDefined();
		});
	});

	test("every node points somewhere unique on the site", () => {
		const hrefs = DOM_TREE.map((n) => n.href);
		expect(new Set(hrefs).size).toBe(hrefs.length);
		for (const href of hrefs) expect(href).toMatch(/^(#[a-z]+|\/blog\/)$/);
	});

	test("fileOf finds a node's file number and refuses unknown anchors", () => {
		expect(fileOf("#whoami")).toBe("01");
		expect(fileOf("/blog/")).toBe("08");
		expect(() => fileOf("#nope")).toThrow();
	});

	test("transmission ids are zero-padded", () => {
		expect(transmissionId(1)).toBe("TX-001");
		expect(transmissionId(42)).toBe("TX-042");
	});
});

describe("rehype table wrap", () => {
	type Node = { type: string; tagName?: string; properties?: object; children?: Node[] };
	const el = (tagName: string, children: Node[] = []): Node => ({
		type: "element",
		tagName,
		properties: {},
		children,
	});

	test("puts every table, nested or not, in a scrollable wrapper", () => {
		const tree: Node = {
			type: "root",
			children: [el("p"), el("table"), el("aside", [el("table")])],
		};
		rehypeTableWrap()(tree);
		const out = tree;
		const [, wrapped, aside] = out.children ?? [];
		expect(wrapped?.tagName).toBe("div");
		expect(wrapped?.properties).toEqual({ className: ["table-wrap"] });
		expect(wrapped?.children?.[0]?.tagName).toBe("table");
		expect(aside?.children?.[0]?.tagName).toBe("div");
		expect(out.children?.[0]?.tagName).toBe("p");
	});
});
