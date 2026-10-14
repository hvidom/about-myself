export function luminance(hex: string): number {
	const n = Number.parseInt(hex.replace("#", ""), 16);
	const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
		const c = v / 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	}) as [number, number, number];
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function iconColor(hex: string): string {
	return luminance(hex) < 0.06 ? "currentColor" : `#${hex.replace("#", "")}`;
}
