/**
 * Calculates reading time based on word count.
 * Returns a clean string matching your existing logic.
 */
export function calculateReadingTime(text: string): string {
	if (!text) return "1"; // Handle empty or blank pages safely

	const wordsPerMinute = 200; // Average reading case
	const words = text.trim().split(/\s+/).length;
	const minutes = words / wordsPerMinute;
	const readTime = Math.ceil(minutes);

	return `${readTime}`;
}
