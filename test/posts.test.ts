import { describe, expect, test, vi } from "vitest";

type Entry = { id: string; data: { title: string; pubDate: Date; draft: boolean } };

const entries: Entry[] = [
	{ id: "old", data: { title: "Old", pubDate: new Date("2024-01-01"), draft: false } },
	{ id: "draft", data: { title: "Draft", pubDate: new Date("2026-01-01"), draft: true } },
	{ id: "new", data: { title: "New", pubDate: new Date("2025-06-01"), draft: false } },
];

vi.mock("astro:content", () => ({
	getCollection: async (_name: string, filter?: (e: Entry) => boolean) =>
		filter ? entries.filter(filter) : entries,
}));

describe("publishedPosts", () => {
	test("drops drafts and sorts newest first", async () => {
		const { publishedPosts } = await import("@/lib/posts");
		const posts = await publishedPosts();
		expect(posts.map((p) => p.id)).toEqual(["new", "old"]);
	});
});

describe("fileIds", () => {
	test("numbers files oldest first, so a new post never renumbers the old ones", async () => {
		const { fileIds } = await import("@/lib/posts");
		const ids = fileIds([
			{ id: "c", data: { pubDate: new Date("2026-10-26") } },
			{ id: "a", data: { pubDate: new Date("2026-01-01") } },
			{ id: "b", data: { pubDate: new Date("2026-05-01") } },
		]);
		expect([...ids]).toEqual([
			["a", "TX-001"],
			["b", "TX-002"],
			["c", "TX-003"],
		]);
	});
});
