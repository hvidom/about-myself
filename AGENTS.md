# about-myself: guide for AI agents

Personal site of Hryhorii Ilin (@hvidom). Astro 7 SSR on Cloudflare Workers, React 19 for
shadcn/ui, Tailwind CSS 4, Bun, Biome. The design matches github.com/hvidom (night sky,
turquoise primary, green accent). The concept: HVIDOM = Hryhorii Victorovich Ilin Document Object Model,
a declassified space dossier. Pages are documents, sections are numbered nodes ("File 01"), posts are
files ("TX-001"). Read `README.md` for the domain setup.

## Commands

```bash
bun install
bun run dev            # http://localhost:4321
bun run test           # Vitest: unit + .astro components (Container API)
bun run e2e            # Playwright: builds, runs wrangler dev on :4330, desktop + mobile Chromium
bun run check          # Biome format + lint (writes fixes)
bun run check:types    # astro check
bun run verify         # everything above, run before pushing
bun run deploy         # types, check, tests, build, wrangler deploy (Worker "about-myself")
bun run deploy:proxy   # Pages project "hvidom" (only when proxy/ changes)
```

Deploying or pushing is the owner's call: do not run `deploy`, `git push` or create PRs unless asked.

## Where things live

- `src/data/profile.ts`: all home-page text. Change copy here, not in components.
- `src/data/dossier.ts`: the HVIDOM layer: the acronym, the classification banner, the subject card and
  `DOM_TREE`, the one list that numbers the home sections (`fileOf("#id")` in `SectionHeading file=…`) and
  drives the Decoder's document tree. Adding a section means adding a node here.
- `src/components/home/*`: home sections. `src/components/ui/*`: shadcn components with brand variants.
- `src/components/magic/*`: Magic UI ports in Astro + CSS (no React/motion): SkyToggle (blue/black sky,
  `html[data-sky]`, applied before paint by an inline script in BaseHead), DiaText (section titles),
  TextAnimate, MorphingText, Highlighter (rough-notation), NeonGradientCard, Redacted (a bar that wipes
  away in view; text ships readable without JS), Stamp (decorative rubber stamp), TypingAnimation (types on view
  or loops `words`; full text for screen readers and no-JS), AnimatedBeam (a pulse travelling between two
  `data-beam-node` elements inside a `data-beam-root`; bends with `curvature`, anchors with `fromSide`/`toSide`,
  pauses off screen). Static SVG lines get the same pulse with the `beam-pulse` utility and `pathLength="1"`.
  All respect reduced motion.
- `src/components/ClassificationBanner.astro` (top and bottom of every page) and `FileTag.astro` (gold
  "File NN" label). `src/components/home/Decoder.astro`: the acronym tiles and the DevTools-style tree.
- `src/lib/code-theme.ts`: Shiki theme in site tokens (hex placeholders + `colorReplacements` to CSS vars).
- `src/styles/global.css`: shadcn tokens plus `--turquoise --green --cyan --violet --pink --gold`,
  utilities `glass`, `space-sky`, `text-brand`, `grid-faint`; `.prose` styles blog posts only.
- `src/lib/pixel.ts`: generated pixel-art SVG (deterministic). Lottie files live in `public/animations/`
  and render through `src/components/LottieAnimations.astro` (lazy, still frame with reduced motion).
- `src/fetch.ts`: advanced routing entry (Hono). Keep Astro's handler order.
- Blog: `src/content/blog/*.mdx`. `draft: true` hides a post from pages, RSS and sitemap. File numbers
  (`fileIds` in `src/lib/posts.ts`) count oldest first, so a new post never renumbers old ones. MDX parts
  live in `src/components/blog/*` (Callout, Figure, StatGrid and inline-SVG charts coloured with Tailwind
  `fill-*`/`stroke-*` tokens). `src/utils/rehype-table-wrap.mjs` wraps tables so they scroll on phones.
- `proxy/`: Pages project that forwards hvidom.is-a.dev to the Worker. Not part of the Astro build.

## Rules that are easy to get wrong

- Astro 7's Rust compiler drops whitespace at line breaks between tags. Write `{" "}` explicitly
  when text and inline elements are split across lines (there are regression tests for this).
- In `.astro` files use `buttonVariants()` / `badgeVariants()` / `cardVariants()` on plain elements.
  Do not render the React `<Button asChild>`: Astro children are not a React element.
- Tokens, not raw colours: `text-turquoise`, `bg-green/10`, `border-border`. Brand logos come from
  `simple-icons` as named imports (never `import *`).
- Text for the site is English. Keep the "Areas of expertise" framing non-commercial (is-a.dev rule).
- Under Vitest the Cloudflare adapter is skipped (`process.env.VITEST` in `astro.config.mjs`).
- Prerendered pages ignore response headers; guard with `Astro.isPrerendered`.

## MCP servers (`.mcp.json` for Claude Code, `.cursor/mcp.json` for Cursor)

astro-docs, shadcn, tailwindcss, playwright, chrome-devtools, context7, cloudflare-docs,
cloudflare-observability. Check Astro and Cloudflare APIs in their docs servers before changing
config; add shadcn components through the shadcn server or `bunx shadcn add`, then fix the
`cn` import to `@/lib/utils` (the CLI sometimes writes `"cn"`).
