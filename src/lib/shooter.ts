// The hero "contribution radar": a looping mini space shooter, the same scene as the
// header of github.com/hvidom. Pure SVG + CSS keyframes, no client JavaScript.
// Class names are prefixed with `ms-` because inline <style> applies to the whole page.

import { rng, SHIP, sprite } from "./pixel";

const GREENS = ["rgba(255,255,255,0.06)", "#0e4429", "#006d32", "#26a641", "#39d353"];
const T = 9; // seconds per loop

const pct = (t: number) => `${((t / T) * 100).toFixed(2)}%`;
const r1 = (n: number) => Math.round(n * 10) / 10;

export function shooterSvg({ cols = 10, rows = 5, cell = 20, gap = 6, seed = 42 } = {}): string {
	const r = rng(seed);
	const pitch = cell + gap;
	const ox = 20;
	const oy = 24;
	const w = ox * 2 + cols * pitch - gap;
	const shipY = oy + rows * pitch + 78;
	const h = shipY + 22;
	const shotCols = [1, 6, 3, 8, 4];

	const lvl: number[][] = [];
	for (let c = 0; c < cols; c++) {
		lvl[c] = [];
		for (let k = 0; k < rows; k++) lvl[c]![k] = r() < 0.24 ? 0 : 1 + Math.floor(r() * 4);
	}
	for (const c of shotCols) lvl[c]![rows - 1] = Math.max(2, lvl[c]![rows - 1]!);
	const colX = (c: number) => ox + c * pitch + cell / 2;
	const shots = shotCols.map((col, k) => ({ col, row: rows - 1, t: 0.8 + k * 1.6 }));

	let css = "";
	let body = "";
	for (let c = 0; c < cols; c++) {
		for (let k = 0; k < rows; k++) {
			const hit = shots.findIndex((s) => s.col === c && s.row === k);
			const cls = hit >= 0 ? ` class="ms-cell${hit}"` : "";
			body += `<rect${cls} x="${ox + c * pitch}" y="${oy + k * pitch}" width="${cell}" height="${cell}" rx="4" fill="${GREENS[lvl[c]![k]!]}"/>`;
		}
	}

	shots.forEach((s, k) => {
		const cx = colX(s.col);
		const targetY = oy + s.row * pitch + cell / 2;
		const start = shipY - 30;
		const dist = r1(start - targetY);
		const hit = s.t + 0.42;
		const color = GREENS[lvl[s.col]![s.row]!];
		body += `<rect class="ms-bolt${k}" x="${cx - 1.5}" y="${start}" width="3" height="12" rx="1.5" fill="#fbbf24" opacity="0"/>`;
		body += `<circle class="ms-pop${k}" cx="${cx}" cy="${targetY}" r="4" stroke="#fbbf24" stroke-width="1.5" fill="none" opacity="0"/>`;
		css += `.ms-bolt${k}{animation:ms-bolt${k} ${T}s linear infinite}
@keyframes ms-bolt${k}{0%,${pct(s.t - 0.01)}{opacity:0;transform:translateY(0)}${pct(s.t)}{opacity:1;transform:translateY(0)}${pct(hit)}{opacity:1;transform:translateY(-${dist}px)}${pct(hit + 0.02)},100%{opacity:0;transform:translateY(-${dist}px)}}
.ms-pop${k}{animation:ms-pop${k} ${T}s ease-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes ms-pop${k}{0%,${pct(hit - 0.01)}{opacity:0;transform:scale(1)}${pct(hit)}{opacity:1;transform:scale(1)}${pct(hit + 0.45)},100%{opacity:0;transform:scale(5)}}
.ms-cell${k}{animation:ms-cell${k} ${T}s linear infinite}
@keyframes ms-cell${k}{0%,${pct(hit)}{opacity:1;fill:${color}}${pct(hit + 0.06)}{opacity:1;fill:#fff}${pct(hit + 0.3)},96%{opacity:0;fill:#fff}100%{opacity:1;fill:${color}}}
`;
	});

	const stops: [number, number][] = [[0, colX(shots[0]!.col)]];
	for (const s of shots) stops.push([s.t - 0.42, colX(s.col)], [s.t + 0.2, colX(s.col)]);
	stops.push([T, colX(shots[0]!.col)]);
	css += `.ms-ship{animation:ms-ship ${T}s ease-in-out infinite}
@keyframes ms-ship{${stops.map(([t, x]) => `${pct(Math.max(0, t))}{transform:translateX(${r1(x)}px)}`).join("")}}
.ms-flame{animation:ms-flame .12s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 0}
@keyframes ms-flame{to{transform:scaleY(.45)}}
@media (prefers-reduced-motion: reduce){[class^="ms-"]{animation:none!important}}`;

	const px = 4;
	const sw = SHIP[0].length * px;
	const sh = SHIP.length * px;
	body += `<g class="ms-ship"><path class="ms-flame" d="M-4 ${shipY + 1}h8l-4 9z" fill="#fb923c"/>${sprite(SHIP, { X: "#60a5fa", C: "#e0f2fe" }, { x: -sw / 2, y: shipY - sh, px })}</g>`;

	return `<svg viewBox="0 0 ${w} ${h}" class="h-auto w-full" role="img" aria-label="A tiny spaceship shoots down squares of a GitHub contribution graph"><style>${css}</style>${body}</svg>`;
}
