import { calculateReadingTime } from "./wordsChecker.ts"; // Maps directly to your .ts utility

/**
 * Remark plugin to compute and inject reading time into MDX frontmatter.
 */
export function remarkReadingTime() {
	return (tree, file) => {
		const textOnPage = toString(tree);
		const readingTime = calculateReadingTime(textOnPage);

		if (!file.data.astro) {
			file.data.astro = { frontmatter: {} };
		}

		// Check if your terminal prints this out during development:
		console.log(`Computed time for ${file.path}: ${readingTime} min read`);

		file.data.astro.frontmatter.minutesRead = `${readingTime} min read`;
	};
}
