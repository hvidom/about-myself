// src/utils/remark-reading-time.mjs
import { toString as mdastToString } from "mdast-util-to-string";
import { calculateReadingTime } from "./wordsChecker.ts"; // Сохраняем ваш путь

/**
 * Remark plugin to compute and inject reading time into MDX frontmatter.
 */
export function remarkReadingTime() {
    return (tree, file) => {
        // Используем переименованную функцию, чтобы избежать shadow-эффекта
        const textOnPage = mdastToString(tree);
        const readingTime = calculateReadingTime(textOnPage);

        if (!file.data.astro) {
            file.data.astro = { frontmatter: {} };
        }

        // Проверка в терминале во время разработки сохранена
        console.log(`Computed time for ${file.path}: ${readingTime} min read`);

        file.data.astro.frontmatter.minutesRead = `${readingTime} min read`;
    };
}