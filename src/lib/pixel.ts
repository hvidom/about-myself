// Pixel-art helpers shared by the hero mini-game and the neofetch astronaut.
// Output is plain SVG markup, rendered on the server with `set:html`.

/** Draws an ASCII map as SVG rects; characters missing from the palette stay empty. */
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

/** Small deterministic PRNG so the generated art is identical on every build. */
export function rng(seed: number): () => number {
	let s = seed | 0;
	return () => {
		s = (s + 0x6d2b79f5) | 0;
		let t = Math.imul(s ^ (s >>> 15), 1 | s);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

export const SHIP = ["...X...", "..XXX..", "..XCX..", "X.XXX.X", "XXXXXXX", "X.X.X.X"] as const;

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

/** Astronaut sprite as a complete SVG element. */
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
