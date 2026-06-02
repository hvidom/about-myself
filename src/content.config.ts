import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			description: z.string().max(120),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			minutesRead: z.string().optional(),
			tags: z.array(z.string()).optional(),
			category: z.string().optional(),
		}),
});

export const collections = { blog };
