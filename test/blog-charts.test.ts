import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, test } from "vitest";
import AuthStack from "@/components/blog/AuthStack.astro";
import DmarcLadder from "@/components/blog/DmarcLadder.astro";
import DnssecChain from "@/components/blog/DnssecChain.astro";
import MailCost from "@/components/blog/MailCost.astro";
import MailFlow from "@/components/blog/MailFlow.astro";
import SetupTime from "@/components/blog/SetupTime.astro";
import ToolMatrix from "@/components/blog/ToolMatrix.astro";

let container: AstroContainer;

beforeAll(async () => {
	container = await AstroContainer.create();
});

const charts = [
	{
		name: "MailFlow",
		Comp: MailFlow,
		title: "How mail moves through Cloudflare, Gmail and Brevo",
		mentions: "SMTP relay",
	},
	{
		name: "ToolMatrix",
		Comp: ToolMatrix,
		title: "What each email platform covers",
		mentions: "Stalwart",
	},
	{ name: "AuthStack", Comp: AuthStack, title: "The five DNS records", mentions: "DNSSEC" },
	{
		name: "DnssecChain",
		Comp: DnssecChain,
		title: "How a DS record gets from Cloudflare to the registry",
		mentions: "DS records only",
	},
	{
		name: "SetupTime",
		Comp: SetupTime,
		title: "about 125 minutes in total",
		mentions: "DMARC ladder",
	},
	{
		name: "DmarcLadder",
		Comp: DmarcLadder,
		title: "The DMARC ladder, week by week",
		mentions: "forgotten sender",
	},
	{
		name: "MailCost",
		Comp: MailCost,
		title: "Monthly email cost by team size",
		mentions: "20 people €136",
	},
];

describe("blog charts", () => {
	test.each(charts)(
		"$name is a labelled image with valid geometry",
		async ({ Comp, title, mentions }) => {
			const html = await container.renderToString(Comp);
			expect(html).toMatch(/<svg[^>]+role="img"/);
			expect(html).toContain(title);
			expect(html).toContain(mentions);
			expect(html).not.toMatch(/NaN|undefined|Infinity/);
		},
	);
});
