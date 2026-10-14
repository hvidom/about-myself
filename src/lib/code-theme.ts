import type { ThemeRegistration } from "shiki";

const C = {
	background: "#a00000",
	foreground: "#a00001",
	comment: "#a00002",
	keyword: "#a00003",
	operator: "#a00004",
	string: "#a00005",
	fn: "#a00006",
	type: "#a00007",
	constant: "#a00008",
	key: "#a00009",
	punctuation: "#a0000a",
} as const;

export const brandCodeTheme: ThemeRegistration = {
	name: "hvidom-night",
	type: "dark",
	fg: C.foreground,
	bg: C.background,
	colors: { "editor.background": C.background, "editor.foreground": C.foreground },
	tokenColors: [
		{
			scope: ["punctuation", "meta.brace", "meta.delimiter"],
			settings: { foreground: C.punctuation },
		},
		{
			scope: ["comment", "punctuation.definition.comment"],
			settings: { foreground: C.comment, fontStyle: "italic" },
		},
		{
			scope: ["keyword", "storage", "storage.type", "storage.modifier", "variable.language"],
			settings: { foreground: C.keyword },
		},
		{
			scope: ["keyword.operator", "storage.type.function.arrow"],
			settings: { foreground: C.operator },
		},
		{
			scope: [
				"string",
				"punctuation.definition.string",
				"punctuation.definition.template-expression",
			],
			settings: { foreground: C.string },
		},
		{ scope: ["entity.name.function", "support.function"], settings: { foreground: C.fn } },
		{
			scope: [
				"entity.name.type",
				"entity.name.class",
				"support.type",
				"support.class",
				"entity.other.inherited-class",
			],
			settings: { foreground: C.type },
		},
		{
			scope: [
				"constant",
				"support.constant",
				"variable.other.constant",
				"variable.other.enummember",
			],
			settings: { foreground: C.constant },
		},
		{
			scope: ["meta.object-literal.key", "support.type.property-name"],
			settings: { foreground: C.key },
		},
	],
	colorReplacements: {
		[C.background]: "transparent",
		[C.foreground]: "var(--foreground)",
		[C.comment]: "var(--muted-foreground)",
		[C.keyword]: "var(--violet)",
		[C.operator]: "var(--violet)",
		[C.string]: "var(--green)",
		[C.fn]: "var(--turquoise)",
		[C.type]: "var(--cyan)",
		[C.constant]: "var(--gold)",
		[C.key]: "var(--pink)",
		[C.punctuation]: "color-mix(in oklch, var(--foreground) 62%, transparent)",
	},
};
