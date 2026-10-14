export type Sky = "blue" | "black";

export const SKY_KEY = "sky";
export const THEME_COLOR: Record<Sky, string> = { blue: "#0b1130", black: "#050505" };

export function currentSky(): Sky {
	return document.documentElement.dataset.sky === "black" ? "black" : "blue";
}

export function applySky(sky: Sky, persist = false) {
	const root = document.documentElement;
	if (sky === "black") root.dataset.sky = "black";
	else delete root.dataset.sky;
	document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[sky]);
	if (!persist) return;
	try {
		localStorage.setItem(SKY_KEY, sky);
	} catch {}
}
