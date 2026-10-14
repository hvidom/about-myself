import { describe, expect, test } from "vitest";
import {
	CF_METRICS,
	CF_MODULES,
	EXPERTISE,
	JOURNEY,
	LINKS,
	NEOFETCH,
	PHRASES,
	SITES,
	TELEMETRY,
	TONE,
} from "@/data/profile";

describe("home page content", () => {
	test("every tone used has Tailwind classes", () => {
		const used = [...NEOFETCH, ...JOURNEY, ...CF_MODULES, ...EXPERTISE].map((x) => x.tone);
		for (const tone of used) expect(TONE[tone]).toBeDefined();
	});

	test("hero phrases fit the typewriter box", () => {
		for (const phrase of PHRASES) expect(phrase.length).toBeLessThanOrEqual(36);
		expect(new Set(PHRASES).size).toBe(PHRASES.length);
	});

	test("journey is newest first", () => {
		const years = JOURNEY.map((j) => Number(j.period.slice(0, 4)));
		expect([...years].sort((a, b) => b - a)).toEqual(years);
	});

	test("Content Factory grid stays even (two columns) and metrics fill one row", () => {
		expect(CF_MODULES.length % 2).toBe(0);
		expect(CF_METRICS).toHaveLength(5);
	});

	test("expertise reads as skills, not a price list (is-a.dev: non-commercial)", () => {
		const text = JSON.stringify(EXPERTISE).toLowerCase();
		for (const word of ["price", "€", "$", "hire", "consulting"]) expect(text).not.toContain(word);
	});

	test("external links are https", () => {
		const urls = [
			LINKS.github,
			LINKS.legacy,
			LINKS.linkedin,
			LINKS.dailydev,
			...Object.values(TELEMETRY),
			...SITES.map((s) => s.href),
		];
		for (const url of urls) expect(url).toMatch(/^https:\/\//);
		expect(LINKS.email).toBe(`mailto:${LINKS.emailText}`);
	});

	test("telemetry comes from the profile repo that the nightly Action updates", () => {
		expect(TELEMETRY.dashboard).toContain("hvidom/hvidom/main/assets/generated/");
		expect(TELEMETRY.shooter).toContain("hvidom/hvidom/main/assets/generated/");
	});
});
