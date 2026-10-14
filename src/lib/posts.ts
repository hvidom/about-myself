import { type CollectionEntry, getCollection } from "astro:content";

export async function publishedPosts(): Promise<CollectionEntry<"blog">[]> {
	const posts = await getCollection("blog", ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
