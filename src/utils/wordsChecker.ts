export function calculateReadingTime(text: string): string {
	if (!text) return "1"; 
	const wordsPerMinute = 200; 
	const words = text.trim().split(/\s+/).length;
	const minutes = words / wordsPerMinute;
	const readTime = Math.ceil(minutes);

	return `${readTime}`;
}
