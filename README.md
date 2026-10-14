# about-myself

Personal site of Hryhorii Ilin (@hvidom): journey, projects, tech stack and writing.
Same night-sky design as [github.com/hvidom](https://github.com/hvidom).

**Live:** https://about-myself.devopsick.workers.dev · https://hvidom.pages.dev · `hvidom.is-a.dev` (pending)

## Stack

Astro 7 · React 19 · Tailwind CSS 4 · shadcn/ui (radix-luma, turquoise/green tokens) ·
Cloudflare Workers via `@astrojs/cloudflare` · Bun · Biome.

## Commands

```bash
bun install
bun run dev            # http://localhost:4321
bun run build          # astro build
bun run preview        # build + preview in workerd
bun run test           # Vitest: unit + .astro components (Container API)
bun run e2e            # Playwright on the built Worker (desktop + mobile Chromium)
bun run e2e:install    # once per machine: Chromium for Playwright
bun run verify         # types + Biome + tests + e2e, run before pushing
bun run deploy         # types + check + tests + build + wrangler deploy (Worker "about-myself")
bun run deploy:proxy   # Pages project "hvidom" (only when proxy/ changes)
```

CI (`.github/workflows/ci.yml`) runs Biome, `astro check`, Vitest and Playwright on every push and PR.

## Editor and AI tooling

- `.vscode/`: Biome on save, Tailwind IntelliSense for v4 (`src/styles/global.css`, `cva`/`cn`), Vitest and Playwright extensions.
- MCP servers in `.mcp.json` (Claude Code) and `.cursor/mcp.json` (Cursor): astro-docs, shadcn, tailwindcss,
  playwright, chrome-devtools, context7, cloudflare-docs, cloudflare-observability.
- Agent rules: `AGENTS.md` (shared, Claude Code loads it via `CLAUDE.md`), `.cursor/rules/ui.mdc`, `.cursor/rules/testing.mdc`.

## How the domain works

is-a.dev can only point a subdomain at Cloudflare **Pages**, while this site is an SSR **Worker**
(room for Brevo, forms and APIs). `proxy/` is a tiny Pages project (`hvidom.pages.dev`) whose
`_worker.js` forwards every request to the `about-myself` Worker through a service binding.
`hvidom.is-a.dev` is a CNAME to `hvidom.pages.dev`; the custom domain is attached to the Pages project.

## Where things live

- `src/data/profile.ts`: all home-page text (journey, projects, expertise, links)
- `src/components/home/*`: home sections; `src/components/ui/*`: shadcn components with brand variants
- `src/styles/global.css`: design tokens (`--turquoise`, `--green`, …) and the `glass`, `space-sky`, `text-brand` utilities
- `src/components/LottieAnimations.astro` + `public/animations/*.lottie`: the hero hacker and section illustrations (lazy, still with reduced motion)
- `src/components/home/Merlin.astro`: the Merlin deck and code tabs; snippets live in `src/data/merlin-snippets/`
- Blog posts: `src/content/blog/*.mdx`; `draft: true` keeps a post out of the site, RSS and sitemap
