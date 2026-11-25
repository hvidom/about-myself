import { describe, expect, test } from "vitest";
import { LINKS } from "@/data/profile";
import {
	blogPostingSchema,
	blogSchema,
	breadcrumbSchema,
	personId,
	personSchema,
	serializeSchema,
	websiteSchema,
} from "@/lib/schema";

const SITE = "https://hvidom.is-a.dev";

describe("JSON-LD", () => {
	test("the person is described once and linked to every profile", () => {
		const person = personSchema(SITE);
		expect(person["@type"]).toBe("Person");
		expect(person["@id"]).toBe("https://hvidom.is-a.dev/#person");
		expect(person.name).toBe("Hryhorii Ilin");
		expect(person.sameAs).toEqual([LINKS.github, LINKS.linkedin, LINKS.dailydev]);
		expect(websiteSchema(SITE).publisher).toEqual({ "@id": personId(SITE) });
	});

	test("a post points to its absolute URL, image, dates and author", () => {
		const post = blogPostingSchema(
			{
				title: "A file",
				description: "What it is about",
				path: "/blog/a-file/",
				publishedTime: new Date("2026-10-26T00:00:00Z"),
				image: "/_astro/cover.jpg",
				tags: ["astro", "cloudflare"],
			},
			SITE,
		);
		expect(post).toMatchObject({
			"@type": "BlogPosting",
			headline: "A file",
			url: "https://hvidom.is-a.dev/blog/a-file/",
			mainEntityOfPage: "https://hvidom.is-a.dev/blog/a-file/",
			image: "https://hvidom.is-a.dev/_astro/cover.jpg",
			datePublished: "2026-10-26T00:00:00.000Z",
			dateModified: "2026-10-26T00:00:00.000Z",
			keywords: "astro, cloudflare",
			author: { "@id": personId(SITE), name: "Hryhorii Ilin" },
		});
		expect(post).not.toHaveProperty("articleSection");
	});

	test("breadcrumbs and the blog list use absolute URLs in order", () => {
		const crumbs = breadcrumbSchema(
			[
				{ name: "Home", path: "/" },
				{ name: "Declassified files", path: "/blog/" },
			],
			SITE,
		);
		expect(crumbs.itemListElement).toEqual([
			{ "@type": "ListItem", position: 1, name: "Home", item: "https://hvidom.is-a.dev/" },
			{
				"@type": "ListItem",
				position: 2,
				name: "Declassified files",
				item: "https://hvidom.is-a.dev/blog/",
			},
		]);
		const blog = blogSchema(
			[{ title: "A file", path: "/blog/a-file/", publishedTime: new Date("2026-10-26") }],
			SITE,
		);
		expect(blog.blogPost).toEqual([
			expect.objectContaining({ url: "https://hvidom.is-a.dev/blog/a-file/" }),
		]);
	});

	test("serialized graph cannot close its script tag", () => {
		const json = serializeSchema([{ "@type": "Thing", name: "</script><script>alert(1)" }]);
		expect(json).not.toContain("<");
		expect(JSON.parse(json)).toEqual({
			"@context": "https://schema.org",
			"@graph": [{ "@type": "Thing", name: "</script><script>alert(1)" }],
		});
	});
});
