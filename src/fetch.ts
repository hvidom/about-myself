import { actions, i18n, middleware, pages, redirects, sessions, trailingSlash } from "astro/hono";
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono<{ Bindings: Env }>();

app.use(logger());
app.use(trailingSlash());
app.use(redirects());
app.use(sessions());
app.use(actions());
app.use(middleware());
app.use(pages());
app.use(i18n());

export type AppType = typeof app;
export default app;
