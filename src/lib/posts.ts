import { type CollectionEntry, getCollection } from "astro:content";
import { transmissionId } from "@/data/dossier";

export async function publishedPosts(): Promise<CollectionEntry<"blog">[]> {
	const posts = await getCollection("blog", ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function fileIds(posts: { id: string; data: { pubDate: Date } }[]): Map<string, string> {
	const oldestFirst = [...posts].sort(
		(a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf() || a.id.localeCompare(b.id),
	);
	return new Map(oldestFirst.map((post, i) => [post.id, transmissionId(i + 1)]));
}
