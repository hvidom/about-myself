import type { Tone } from "./profile";

export const CODENAME = "HVIDOM";
export const FILE_ID = "HVI-DOM-0001";

export const ACRONYM: { letter: string; word: string; half: "subject" | "model"; note: string }[] =
	[
		{ letter: "H", word: "Hryhorii", half: "subject", note: "given name" },
		{ letter: "V", word: "Victorovich", half: "subject", note: "patronymic" },
		{ letter: "I", word: "Ilin", half: "subject", note: "surname" },
		{ letter: "D", word: "Document", half: "model", note: "every page is one" },
		{ letter: "O", word: "Object", half: "model", note: "every section is a node" },
		{ letter: "M", word: "Model", half: "model", note: "the tree that files them" },
	];

export const BANNER = {
	struck: "TOP SECRET",
	full: "HVIDOM // DECLASSIFIED FOR PUBLIC RELEASE",
	short: "HVIDOM // DECLASSIFIED",
};

export const SUBJECT: { key: string; value: string; redact?: string }[] = [
	{ key: "File", value: FILE_ID },
	{ key: "Subject", value: "Hryhorii Victorovich Ilin", redact: "Victorovich" },
	{ key: "Station", value: "Dublin, IE" },
	{ key: "Clearance", value: "Public" },
	{ key: "Threat level", value: "Mostly harmless" },
];

export type DomNode = {
	file: string;
	tag: string;
	attrs: [string, string][];
	href: string;
	label: string;
	tone: Tone;
};

export const DOM_TREE: DomNode[] = [
	{
		file: "01",
		tag: "subject",
		attrs: [
			["name", "Hryhorii Victorovich Ilin"],
			["station", "dublin"],
		],
		href: "#whoami",
		label: "The short version",
		tone: "turquoise",
	},
	{
		file: "02",
		tag: "log",
		attrs: [["span", "2011..2026"]],
		href: "#journey",
		label: "Professional journey",
		tone: "violet",
	},
	{
		file: "03",
		tag: "mission",
		attrs: [
			["codename", "content-factory"],
			["status", "live"],
		],
		href: "#work",
		label: "Featured work",
		tone: "green",
	},
	{
		file: "04",
		tag: "agent",
		attrs: [
			["codename", "merlin"],
			["shift", "19:00-08:00"],
		],
		href: "#merlin",
		label: "Meet Merlin",
		tone: "pink",
	},
	{
		file: "05",
		tag: "modules",
		attrs: [["count", "4"]],
		href: "#expertise",
		label: "Areas of expertise",
		tone: "gold",
	},
	{
		file: "06",
		tag: "payload",
		attrs: [["src", "package.json"]],
		href: "#stack",
		label: "Tech stack",
		tone: "cyan",
	},
	{
		file: "07",
		tag: "telemetry",
		attrs: [["source", "github"]],
		href: "#telemetry",
		label: "GitHub telemetry",
		tone: "violet",
	},
	{
		file: "08",
		tag: "transmissions",
		attrs: [["href", "/blog/"]],
		href: "/blog/",
		label: "Declassified files",
		tone: "turquoise",
	},
	{
		file: "09",
		tag: "channel",
		attrs: [["protocol", "ping"]],
		href: "#contact",
		label: "Contact",
		tone: "green",
	},
];

export function fileOf(href: string): string {
	const node = DOM_TREE.find((n) => n.href === href);
	if (!node) throw new Error(`No dossier node for ${href}`);
	return node.file;
}

export function transmissionId(position: number): string {
	return `TX-${String(position).padStart(3, "0")}`;
}
