import { access, readFile, writeFile } from "node:fs/promises";

const outputDirectory = new URL("../out/", import.meta.url);
const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

await access(new URL("index.html", outputDirectory));

const manifest = {
  schemaVersion: 1,
  project: packageJson.name,
  version: packageJson.version,
  releaseLabel: process.env.HANDOFF_LABEL ?? "local-final",
  sourceCommit: process.env.GITHUB_SHA ?? "local-build",
  sourceBranch: process.env.GITHUB_REF_NAME ?? "local-worktree",
  targetUrl: process.env.SITE_URL ?? "https://www.trs.com.cn/",
  generatedAt: new Date().toISOString(),
  deploymentMode: "static-site-root",
  uploadRule:
    "Upload the contents inside the artifact's site directory, not the site directory itself, to the website document root.",
  requiredEntries: [
    "index.html",
    "404.html",
    "_next/",
    "trs-logo.png",
    "og.png",
  ],
};

await writeFile(
  new URL("handoff-manifest.json", outputDirectory),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);
