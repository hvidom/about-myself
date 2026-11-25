import type { APIRoute } from "astro";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
import { DOM_TREE } from "@/data/dossier";
import { LINKS } from "@/data/profile";
import { publishedPosts } from "@/lib/posts";

export const prerender = true;

/** https://llmstxt.org: a plain map of the site for AI assistants, built from the same data as the pages. */
export const GET: APIRoute = async ({ site }) => {
	const base = new URL("/", site);
	const abs = (path: string) => new URL(path, base).href;
	const posts = await publishedPosts();

	const lines = [
		`# ${SITE_TITLE}: Hryhorii Ilin`,
		"",
		`> ${SITE_DESCRIPTION}`,
		"",
		"Hryhorii Ilin (hvidom) is a full-stack developer in Dublin, Ireland, formerly a sales director. He builds TypeScript platforms on Bun, Hono, React, Astro, Postgres and Cloudflare. The site is styled as a declassified dossier: sections are numbered files, posts are declassified transmissions.",
		"",
		"## Home page sections",
		"",
		...DOM_TREE.map((node) => `- [${node.label}](${abs(node.href)})`),
		"",
		"## Declassified files (blog)",
		"",
		...posts.map(
			(post) => `- [${post.data.title}](${abs(`/blog/${post.id}/`)}): ${post.data.description}`,
		),
		"",
		"## Elsewhere",
		"",
		`- [GitHub](${LINKS.github})`,
		`- [LinkedIn](${LINKS.linkedin})`,
		`- [daily.dev](${LINKS.dailydev})`,
		`- Email: ${LINKS.emailText}`,
		`- [RSS](${abs("/rss.xml")})`,
		"",
	];

	return new Response(lines.join("\n"), {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
