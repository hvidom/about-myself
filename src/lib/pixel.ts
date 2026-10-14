export function sprite(
	map: readonly string[],
	palette: Record<string, string>,
	{ x = 0, y = 0, px }: { x?: number; y?: number; px: number },
): string {
	let out = "";
	map.forEach((row, ry) => {
		[...row].forEach((ch, rx) => {
			const fill = palette[ch];
			if (fill) {
				out += `<rect x="${x + rx * px}" y="${y + ry * px}" width="${px}" height="${px}" fill="${fill}"/>`;
			}
		});
	});
	return out;
}

export const ASTRONAUT = [
	".....OOOOOO.....",
	"...OOWWWWWWOO...",
	"..OWWWWWWWWWWO..",
	".OWWWWWWWWWWWWO.",
	".OWWVVVVVVVVWWO.",
	"OWWVVVVVVVVVVWWO",
	"OWWVCCVVVVVVVWWO",
	"OWWVCVVVVVVVVWWO",
	"OWWVVVVVVVVPVWWO",
	"OWWVVVVVVVVVVWWO",
	".OWWVVVVVVVVWWO.",
	".OWWWWWWWWWWWWO.",
	"..OGWWWWWWWWGO..",
	"...OGGGGGGGGO...",
	"..OWWWWWWWWWWO..",
	".OWWWRRWWBBWWWO.",
	".OWWWWWWWWWWWWO.",
] as const;

export function astronautSvg(px = 12): string {
	const w = ASTRONAUT[0].length * px;
	const h = ASTRONAUT.length * px;
	const body = sprite(
		ASTRONAUT,
		{
			O: "#3b4664",
			W: "#e6edf3",
			G: "#9aa7bd",
			V: "#0b1130",
			C: "var(--turquoise)",
			P: "var(--violet)",
			R: "#ef4444",
			B: "var(--green)",
		},
		{ px },
	);
	return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" shape-rendering="crispEdges" aria-hidden="true">${body}</svg>`;
}
