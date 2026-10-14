// Every request goes to the about-myself Worker through a service binding
// (same Cloudflare account, no extra network hop). The original URL and headers are kept.
export default {
	fetch(request, env) {
		return env.SITE.fetch(request);
	},
};
