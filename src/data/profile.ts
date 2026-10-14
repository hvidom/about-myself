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

export const CF_MODULES: { title: string; text: string; tone: Tone; href?: string }[] = [
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
	{
		title: "AI agent “Merlin”",
		text: "Night-shift replies, n8n-style skills, MCP",
		tone: "pink",
		href: "#merlin",
	},
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
] as const;

export const MERLIN_STATS = [
	{ value: "11", label: "chat tools" },
	{ value: "19", label: "skill steps" },
	{ value: "35", label: "emotions" },
	{ value: "88", label: "unit tests" },
];

export const MERLIN_TOOLS = [
	"search_records",
	"create_task",
	"attention_summary",
	"my_open_tasks",
	"draft_customer_reply",
	"summarize_conversation",
	"write_article",
	"article_status",
	"find_tips",
	"merlin_skills",
	"update_skill_instructions",
];

export const MERLIN_BLOCKS: { group: string; tone: Tone; steps: string[] }[] = [
	{
		group: "Flow",
		tone: "gold",
		steps: [
			"Lead trigger",
			"Pause",
			"Wait for working hours",
			"Working hours?",
			"Check the lead",
			"A/B split",
			"Wait for a reply",
		],
	},
	{
		group: "Merlin thinks",
		tone: "violet",
		steps: ["AI: what the customer wants", "Merlin chats"],
	},
	{
		group: "Merlin writes",
		tone: "green",
		steps: ["WhatsApp template", "Message to the customer"],
	},
	{
		group: "For the team",
		tone: "cyan",
		steps: ["Note in the chat", "Assign", "Notify the team", "Create a task"],
	},
	{ group: "CRM", tone: "turquoise", steps: ["Change the stage", "Tags", "Create a deal"] },
	{ group: "Other systems", tone: "pink", steps: ["Webhook"] },
];

export type MerlinVisual = "tools" | "flow" | "blocks" | "guards" | "night" | "face";

export const MERLIN_SLIDES: {
	visual: MerlinVisual;
	title: string;
	text: string;
	points: string[];
	tone: Tone;
}[] = [
	{
		visual: "tools",
		title: "An AI teammate inside the CRM",
		text: "Staff ask in plain words. Merlin answers with 11 tools: he searches records, creates tasks, drafts replies to customers and summarises long conversations.",
		points: [
			"“What needs my attention?” is one question, not five screens",
			"Every answer gets 👍 or 👎 and “how it should have been”",
			"Those corrections go back into his instructions",
		],
		tone: "violet",
	},
	{
		visual: "flow",
		title: "Skills: automations on a canvas",
		text: "The team draws a flow, like in n8n: one trigger, then steps. Merlin runs it for every lead that matches.",
		points: [
			"Triggers: a lead is created, changes stage, or is stuck for N days",
			"AI steps branch the flow by what the customer wants",
			"Live counters show how many leads passed each step and wait there now",
		],
		tone: "turquoise",
	},
	{
		visual: "blocks",
		title: "19 building blocks",
		text: "Waits and checks, AI decisions, WhatsApp messages, CRM changes and a signed webhook for everything else.",
		points: [
			"React Flow editor with a minimap, undo/redo and copy/paste between skills",
			"Drop a step onto a connection to insert it",
			"One-click auto layout, sticky notes and step search",
		],
		tone: "gold",
	},
	{
		visual: "guards",
		title: "Guard rails before autopilot",
		text: "A flow that writes to customers has to be predictable, so a skill is checked before it can be switched on.",
		points: [
			"One run per lead per skill, locked so two workers never share it",
			"Meta’s 24-hour messaging window is respected",
			"A dry run first, or a real run on a single test lead",
			"The “stuck” trigger only looks back 7 days, never at a legacy backlog",
		],
		tone: "green",
	},
	{
		visual: "night",
		title: "The night shift",
		text: "From 19:00 to 08:00 Merlin answers customers in the chosen channels while the sales team is off.",
		points: [
			"Waits for 60 seconds of quiet, because customers write in bursts",
			"Steps back the moment a person replies",
			"Never names prices and hands over when a human is needed",
			"Reply caps per conversation and per night, and a digest in the morning",
		],
		tone: "cyan",
	},
	{
		visual: "face",
		title: "A face with feelings",
		text: "A jelly mascot with 35 emotions. He listens while you type, thinks, looks proud when a task is done and dozes when you are away.",
		points: [
			"Closes his eyes when you type a password, an API key or a card number",
			"A corner buddy with page tips, cheers and reminders to take a break",
			"“Quiet until morning” and an off switch",
		],
		tone: "pink",
	},
];

export const MERLIN_SNIPPETS: { id: string; title: string; path: string; note: string }[] = [
	{
		id: "step-ports",
		title: "Step registry",
		path: "packages/types/src/merlin-skills.ts",
		note: "One typed table drives the editor’s handles, the validator and the engine’s routing.",
	},
	{
		id: "advance-run",
		title: "Run engine",
		path: "apps/api/src/lib/merlin-skills.ts",
		note: "A resumable state machine: an atomic UPDATE … RETURNING claims the run, then every step returns a port, a wait or a failure.",
	},
	{
		id: "ai-intent",
		title: "AI intent step",
		path: "apps/api/src/lib/merlin-skills.ts",
		note: "An LLM classification becomes a branch of the graph, and falls back to “other” when there is no conversation or the model fails.",
	},
	{
		id: "stale-window",
		title: "Stale window & A/B",
		path: "packages/types/src/merlin-skills.ts",
		note: "A bounded look-back for the “stuck” trigger, and an A/B split that hashes the run id (FNV-1a), so nothing extra is stored.",
	},
	{
		id: "auto-layout",
		title: "Auto layout",
		path: "apps/admin/src/lib/merlin-skill-graph.ts",
		note: "Layered layout for the canvas: the column is the longest path from the trigger, found with a memoised DFS and a loop guard.",
	},
];

export const EXPERTISE: {
	code: string;
	title: string;
	items: string[];
	tone: Tone;
	animation: string;
}[] = [
	{
		code: "MODULE_01 // RESEARCH",
		title: "Market strategy",
		items: [
			"Customer-centric modeling",
			"Lead-generation architectures",
			"Competitive forecasting",
		],
		tone: "turquoise",
		animation: "/animations/lab-feature.lottie",
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
		animation: "/animations/seo-feature.lottie",
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
		animation: "/animations/bg.lottie",
	},
	{
		code: "MODULE_04 // BRAND",
		title: "Visual identity",
		items: ["Interactive UI conventions", "Corporate digital redesign", "Sleek modern layouts"],
		tone: "pink",
		animation: "/animations/mobile-app-feature.lottie",
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

export const TELEMETRY = {
	dashboard: "https://raw.githubusercontent.com/hvidom/hvidom/main/assets/generated/dashboard.svg",
	shooter:
		"https://raw.githubusercontent.com/hvidom/hvidom/main/assets/generated/space-shooter.webp",
	devcard: "https://api.daily.dev/devcards/v2/iyERrjguTozlCs2NE8oo1.png?type=default&r=hv1",
	holopin: "https://holopin.me/frikadellios8",
};

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
