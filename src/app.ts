import { actions, i18n, middleware, pages } from "astro/hono";
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono<{ Bindings: Env }>();

app.use(logger());
app.use(i18n());
app.use(middleware());
app.use(actions());
app.use(pages());

export type AppType = typeof app;
export default app;
