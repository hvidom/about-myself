
import { toString as mdastToString } from "mdast-util-to-string";
import { calculateReadingTime } from "./wordsChecker.ts"; 

export function remarkReadingTime() {
    return (tree, file) => {
        const textOnPage = mdastToString(tree);
        const readingTime = calculateReadingTime(textOnPage);
        if (!file.data.astro) {
            file.data.astro = { frontmatter: {} };
        }
        console.log(`Computed time for ${file.path}: ${readingTime} min read`);
        file.data.astro.frontmatter.minutesRead = `${readingTime} min read`;
    };
}