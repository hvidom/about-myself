// Deploys proxy/ (Cloudflare Pages project "hvidom") from a temporary copy:
// inside the repo Wrangler would pick up Astro's generated .wrangler/deploy/config.json.
import { spawnSync } from "node:child_process";
import { cpSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const wrangler = join(root, "node_modules", ".bin", "wrangler");
const dir = mkdtempSync(join(tmpdir(), "hvidom-proxy-"));
cpSync(join(root, "proxy"), dir, { recursive: true });

// Pages configs can't hold account_id; the Devopsick account owns both the Worker and the Pages project.
const env = { ...process.env, CLOUDFLARE_ACCOUNT_ID: "f969840f36d3963d6371476f0c6344ae" };
const run = (args) => spawnSync(wrangler, args, { cwd: dir, env, stdio: "inherit" }).status ?? 1;
try {
	if (process.argv.includes("--create")) run(["pages", "project", "create", "hvidom", "--production-branch", "main", "--force"]);
	process.exitCode = run(["pages", "deploy", "--branch", "main", "--commit-dirty=true"]);
} finally {
	rmSync(dir, { recursive: true, force: true });
}
