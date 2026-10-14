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
bun run check:types    # astro check
bun run deploy         # types + check + build + wrangler deploy (Worker "about-myself")
bun run deploy:proxy   # Pages project "hvidom" (only when proxy/ changes)
```

## How the domain works

is-a.dev can only point a subdomain at Cloudflare **Pages**, while this site is an SSR **Worker**
(room for Brevo, forms and APIs). `proxy/` is a tiny Pages project (`hvidom.pages.dev`) whose
`_worker.js` forwards every request to the `about-myself` Worker through a service binding.
`hvidom.is-a.dev` is a CNAME to `hvidom.pages.dev`; the custom domain is attached to the Pages project.

## Where things live

- `src/data/profile.ts`: all home-page text (journey, projects, expertise, links)
- `src/components/home/*`: home sections; `src/components/ui/*`: shadcn components with brand variants
- `src/styles/global.css`: design tokens (`--turquoise`, `--green`, …) and the `glass`, `space-sky`, `text-brand` utilities
- `src/lib/shooter.ts`: the "contribution radar" mini-game in the hero (pure SVG + CSS)
- Blog posts: `src/content/blog/*.mdx`; `draft: true` keeps a post out of the site, RSS and sitemap
