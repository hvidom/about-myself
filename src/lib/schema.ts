import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
import { HERO_STACK, LINKS } from "@/data/profile";

/**
 * schema.org JSON-LD for the head of each page (rendered by `components/JsonLd.astro`).
 * Nodes reference each other by `@id`, so the home page describes the person once
 * and posts point back to it.
 */
export type SchemaNode = Record<string, unknown>;

const NAME = "Hryhorii Ilin";

const abs = (path: string, site: URL | string) => new URL(path, site).href;
export const personId = (site: URL | string) => `${abs("/", site)}#person`;
export const websiteId = (site: URL | string) => `${abs("/", site)}#website`;
export const blogId = (site: URL | string) => `${abs("/blog/", site)}#blog`;

const authorRef = (site: URL | string): SchemaNode => ({
	"@type": "Person",
	"@id": personId(site),
	name: NAME,
	url: abs("/", site),
});

export function personSchema(site: URL | string): SchemaNode {
	return {
		"@type": "Person",
		"@id": personId(site),
		name: NAME,
		alternateName: ["hvidom", "Hryhorii Victorovich Ilin"],
		givenName: "Hryhorii",
		familyName: "Ilin",
		jobTitle: "Full-stack developer",
		description: SITE_DESCRIPTION,
		url: abs("/", site),
		email: LINKS.emailText,
		address: { "@type": "PostalAddress", addressLocality: "Dublin", addressCountry: "IE" },
		knowsAbout: HERO_STACK,
		sameAs: [LINKS.github, LINKS.linkedin, LINKS.dailydev],
	};
}

export function websiteSchema(site: URL | string): SchemaNode {
	return {
		"@type": "WebSite",
		"@id": websiteId(site),
		name: SITE_TITLE,
		alternateName: "HVIDOM",
		url: abs("/", site),
		description: SITE_DESCRIPTION,
		inLanguage: "en",
		author: { "@id": personId(site) },
		publisher: { "@id": personId(site) },
	};
}

export function breadcrumbSchema(
	items: { name: string; path: string }[],
	site: URL | string,
): SchemaNode {
	return {
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: abs(item.path, site),
		})),
	};
}

export function blogSchema(
	posts: { title: string; path: string; publishedTime: Date }[],
	site: URL | string,
): SchemaNode {
	return {
		"@type": "Blog",
		"@id": blogId(site),
		name: "Declassified files",
		url: abs("/blog/", site),
		inLanguage: "en",
		author: authorRef(site),
		isPartOf: { "@id": websiteId(site) },
		blogPost: posts.map((post) => ({
			"@type": "BlogPosting",
			headline: post.title,
			url: abs(post.path, site),
			datePublished: post.publishedTime.toISOString(),
		})),
	};
}

export type PostSchemaInput = {
	title: string;
	description: string;
	path: string;
	publishedTime: Date;
	modifiedTime?: Date | undefined;
	image?: string | undefined;
	category?: string | undefined;
	tags?: string[] | undefined;
};

export function blogPostingSchema(post: PostSchemaInput, site: URL | string): SchemaNode {
	const url = abs(post.path, site);
	return {
		"@type": "BlogPosting",
		"@id": `${url}#article`,
		headline: post.title,
		description: post.description,
		url,
		mainEntityOfPage: url,
		datePublished: post.publishedTime.toISOString(),
		dateModified: (post.modifiedTime ?? post.publishedTime).toISOString(),
		inLanguage: "en",
		author: authorRef(site),
		publisher: authorRef(site),
		isPartOf: { "@id": blogId(site) },
		...(post.image ? { image: abs(post.image, site) } : {}),
		...(post.category ? { articleSection: post.category } : {}),
		...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
	};
}

/** One `<script type="application/ld+json">` body; `<` is escaped so text can never close the script tag. */
export function serializeSchema(nodes: SchemaNode[]): string {
	return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(
		/</g,
		"\\u003c",
	);
}
