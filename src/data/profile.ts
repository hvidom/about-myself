// Content of the home page. Text lives here; components only lay it out.

export const PHRASES = [
	"shipping TypeScript from DB to UI",
	"building CRMs that actually sell",
	"teaching AI agents the night shift",
	"15+ years of code, servers & sales",
];

export const HERO_STACK = ["TypeScript", "Bun", "Hono", "React", "Astro", "Postgres", "Cloudflare"];

export type Tone = "turquoise" | "green" | "violet" | "pink" | "gold" | "cyan";

export const NEOFETCH: { key: string; value: string; tone: Tone }[] = [
	{ key: "Name", value: "Hryhorii Ilin · @hvidom", tone: "turquoise" },
	{ key: "Role", value: "Full-stack developer · ex-sales director", tone: "turquoise" },
	{ key: "Location", value: "Dublin, Ireland · originally from Ukraine", tone: "turquoise" },
	{ key: "Uptime", value: "15+ years in tech: code, servers, sales", tone: "violet" },
	{ key: "Stack", value: "TypeScript · Bun · Hono · React · Astro · Postgres", tone: "violet" },
	{ key: "Infra", value: "Cloudflare · Docker · Coolify · Oracle · Hetzner", tone: "violet" },
	{ key: "AI", value: "Claude · Vercel AI SDK · MCP · agents & skills", tone: "pink" },
	{ key: "Editor", value: "VS Code + Claude Code", tone: "pink" },
	{ key: "Learning", value: "Software Development course: Python, C#", tone: "green" },
	{ key: "Into", value: "open source · startups · psychology of sales", tone: "green" },
	{ key: "Motto", value: "“Ship it to production. Then sell it.”", tone: "gold" },
];

export const JOURNEY: {
	period: string;
	label: string;
	role: string;
	focus: string;
	text: string;
	tags: string[];
	tone: Tone;
}[] = [
	{
		period: "2026",
		label: "Now",
		role: "Builder of Content Factory",
		focus: "All three crafts in one product",
		text: "A TypeScript platform that runs a car-electronics business in Dublin: CRM, an omnichannel inbox, a Git-backed website CMS, the warehouse, payments and an AI agent that answers customers at night.",
		tags: ["Bun", "Hono", "React 19", "PostgreSQL", "AI agents"],
		tone: "pink",
	},
	{
		period: "2020 – present",
		label: "Lead role",
		role: "Sales Director & Technology Architect",
		focus: "Strategic pipelines & enterprise systems",
		text: "Leading sales engineering and technology integrations. Designed and deployed automated CRM mapping workflows (HubSpot, Salesforce) integrated directly with backend customer telemetry databases. Coached over 30 sales agents, bridging the gap between deep technical implementation and human sales psychology.",
		tags: ["Sales strategy", "CRM automation", "Sales coaching", "API integrations"],
		tone: "violet",
	},
	{
		period: "2015 – 2020",
		label: "Full-stack",
		role: "Senior Full-Stack Developer",
		focus: "High-performance client applications",
		text: "Spearheaded UI design and system backend architectures for multiple digital products. Built highly responsive components using React, Vue, and Next.js, and designed efficient Node APIs handling complex relational queries. Maintained 99.9% application uptime by optimizing codebases and setting up strict CI/CD verification workflows.",
		tags: ["React / Next.js", "Vue", "Node.js", "PostgreSQL", "CI/CD"],
		tone: "turquoise",
	},
	{
		period: "2011 – 2015",
		label: "DevOps",
		role: "Infrastructure Engineer & Linux Administrator",
		focus: "Server security & high-availability hosting",
		text: "Configured highly secure server clusters with custom network routing, kernel-level firewall settings, and automated backup operations. Oversaw full DevOps processes, setting up isolated Docker containers, load balancers, and Cloudflare DNS security protections for enterprise clients.",
		tags: ["Linux / Bash", "Docker", "Server security", "Cloudflare"],
		tone: "green",
	},
];

export const CF_METRICS = [
	{ value: "340k+", label: "lines of TypeScript" },
	{ value: "131", label: "DB migrations" },
	{ value: "230", label: "test suites" },
	{ value: "80", label: "API route modules" },
	{ value: "35", label: "background jobs" },
];

export const CF_MODULES: { title: string; text: string; tone: Tone }[] = [
	{
		title: "Omnichannel inbox",
		text: "WhatsApp, Messenger, Instagram, email, web chat",
		tone: "green",
	},
	{
		title: "CRM & sales",
		text: "Leads → deals → jobs, price calculator, quotes",
		tone: "turquoise",
	},
	{ title: "AI agent “Merlin”", text: "Night-shift replies, n8n-style skills, MCP", tone: "pink" },
	{
		title: "Website CMS on Git",
		text: "Edits radioking.ie, deploys to Cloudflare",
		tone: "violet",
	},
	{
		title: "Warehouse & supply",
		text: "Kits, stock moves, purchasing, returns, fleet",
		tone: "gold",
	},
	{
		title: "Payments & documents",
		text: "Stripe, deposits, reminders, quotes, invoices",
		tone: "cyan",
	},
	{
		title: "Marketing analytics",
		text: "GA4, Search Console, Google Ads, DataForSEO",
		tone: "gold",
	},
	{
		title: "Ops & security",
		text: "OpenTelemetry → Grafana, RBAC, 2FA, audit, backups",
		tone: "violet",
	},
];

export const CF_STACK =
	"Bun · Hono · React 19 · TanStack · Tailwind v4 · shadcn/ui · Drizzle · PostgreSQL 18 · Plate · Vercel AI SDK · Docker on Coolify";

export const SITES = [
	{
		name: "radioking.ie",
		href: "https://radioking.ie",
		image: "radioking",
		text: "Website and shop for a car-electronics installer in Dublin: a landing page per search intent, about 175 products with Stripe Checkout and server-side order reconciliation. It replaced WordPress without breaking a single URL.",
		tags: ["Astro", "React", "Hono", "Stripe", "Cloudflare Workers"],
	},
	{
		name: "verocleaning.ca",
		href: "https://verocleaning.ca",
		image: "verocleaning",
		text: "Fixed-price house cleaning in Toronto and the GTA: an instant quote builder, content edited in Pages CMS, and a DataForSEO keyword pipeline that decides which pages get built.",
		tags: ["Astro", "Hono", "Drizzle", "shadcn/ui", "Cloudflare"],
	},
] as const;

// What I work on. Areas of expertise, not a price list.
export const EXPERTISE: { code: string; title: string; items: string[]; tone: Tone }[] = [
	{
		code: "MODULE_01 // RESEARCH",
		title: "Market strategy",
		items: [
			"Customer-centric modeling",
			"Lead-generation architectures",
			"Competitive forecasting",
		],
		tone: "turquoise",
	},
	{
		code: "MODULE_02 // ANALYTICS",
		title: "Data integration",
		items: [
			"Relational DB management",
			"Analytics pipeline structure",
			"Demographic cohort matching",
		],
		tone: "green",
	},
	{
		code: "MODULE_03 // ARCHITECTURE",
		title: "System architecture",
		items: [
			"Strategic business architecture",
			"Scalability assessments",
			"Modern toolstack integration",
		],
		tone: "violet",
	},
	{
		code: "MODULE_04 // BRAND",
		title: "Visual identity",
		items: ["Interactive UI conventions", "Corporate digital redesign", "Sleek modern layouts"],
		tone: "pink",
	},
];

export const LINKS = {
	github: "https://github.com/hvidom",
	legacy: "https://github.com/Frikadellios",
	linkedin: "https://www.linkedin.com/in/hryhorii-ilin-952426341",
	dailydev: "https://app.daily.dev/hvidom",
	email: "mailto:devopsick@pm.me",
	emailText: "devopsick@pm.me",
};

// Generated nightly by github.com/hvidom/hvidom (.github/workflows/profile.yml).
export const TELEMETRY = {
	dashboard: "https://raw.githubusercontent.com/hvidom/hvidom/main/assets/generated/dashboard.svg",
	shooter:
		"https://raw.githubusercontent.com/hvidom/hvidom/main/assets/generated/space-shooter.webp",
	devcard: "https://api.daily.dev/devcards/v2/iyERrjguTozlCs2NE8oo1.png?type=default&r=hv1",
	holopin: "https://holopin.me/frikadellios8",
};

/** Tailwind classes per tone (kept literal so Tailwind can see them). */
export const TONE: Record<Tone, { text: string; bg: string; border: string; dot: string }> = {
	turquoise: {
		text: "text-turquoise",
		bg: "bg-turquoise/10",
		border: "border-turquoise/30",
		dot: "bg-turquoise",
	},
	green: { text: "text-green", bg: "bg-green/10", border: "border-green/30", dot: "bg-green" },
	violet: { text: "text-violet", bg: "bg-violet/10", border: "border-violet/30", dot: "bg-violet" },
	pink: { text: "text-pink", bg: "bg-pink/10", border: "border-pink/30", dot: "bg-pink" },
	gold: { text: "text-gold", bg: "bg-gold/10", border: "border-gold/30", dot: "bg-gold" },
	cyan: { text: "text-cyan", bg: "bg-cyan/10", border: "border-cyan/30", dot: "bg-cyan" },
};
