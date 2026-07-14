import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const packageDirectory = new URL("../handoff-package/", import.meta.url);
const siteDirectory = new URL("site/", packageDirectory);

test("packages a root-path production handoff for the official website", async () => {
  const [
    html,
    manifestText,
    workflow,
    guide,
    sourceGuide,
    checksums,
  ] = await Promise.all([
    readFile(new URL("index.html", siteDirectory), "utf8"),
    readFile(new URL("handoff-manifest.json", packageDirectory), "utf8"),
    readFile(
      new URL("../.github/workflows/handoff.yml", import.meta.url),
      "utf8",
    ),
    readFile(new URL("上线交接指南.md", packageDirectory), "utf8"),
    readFile(
      new URL("../docs/PRODUCTION-HANDOFF.md", import.meta.url),
      "utf8",
    ),
    readFile(new URL("checksums.sha256", packageDirectory), "utf8"),
  ]);

  assert.match(html, /https:\/\/www\.trs\.com\.cn\//);
  assert.match(html, /\/_next\/static\//);
  assert.match(html, /src="\/trs-logo\.png"/);
  assert.doesNotMatch(html, /\/trs-future-site\/_next\/static\//);

  const localAssets = [
    ...html.matchAll(/(?:href|src)="\/([^"?#]+)"/g),
  ]
    .map((match) => match[1])
    .filter(Boolean);

  assert.ok(localAssets.length > 0);
  await Promise.all(
    [...new Set(localAssets)].map((asset) =>
      access(new URL(asset, siteDirectory)),
    ),
  );

  await assert.rejects(access(new URL("handoff-manifest.json", siteDirectory)));

  const manifest = JSON.parse(manifestText);
  assert.equal(manifest.project, "trs-future-site");
  assert.equal(manifest.version, "1.3.1");
  assert.equal(manifest.targetUrl, "https://www.trs.com.cn/");
  assert.equal(manifest.deploymentMode, "static-site-root");
  await Promise.all(
    manifest.requiredEntries.map((entry) => access(new URL(entry, siteDirectory))),
  );

  assert.match(workflow, /workflow_dispatch/);
  assert.doesNotMatch(workflow, /^\s*push:/m);
  assert.match(workflow, /npm test/);
  assert.match(workflow, /npm audit/);
  assert.match(workflow, /actions\/upload-artifact@v7/);
  assert.match(workflow, /trs-website-production-/);
  assert.match(workflow, /path: handoff-package/);
  assert.match(workflow, /retention-days: 30/);

  assert.match(guide, /部门会签/);
  assert.match(guide, /下载终稿包/);
  assert.match(guide, /回滚/);
  assert.match(guide, /handoff-manifest\.json/);
  assert.equal(guide, sourceGuide);
  await access(new URL("EDITING-GUIDE.md", packageDirectory));
  await access(new URL("CONTENT-SOURCES.md", packageDirectory));
  assert.match(checksums, /  handoff-manifest\.json$/m);
  assert.match(checksums, /  上线交接指南\.md$/m);
  assert.match(checksums, /  site\/index\.html$/m);
  assert.match(checksums, /  site\/_next\//m);

  const checksumLines = checksums.trim().split("\n");
  assert.ok(checksumLines.length > 0);
  await Promise.all(
    checksumLines.map(async (line) => {
      const match = /^([a-f0-9]{64})  (.+)$/.exec(line);
      assert.ok(match, `invalid checksum line: ${line}`);
      assert.ok(!match[2].startsWith("/") && !match[2].includes(".."));
      const digest = createHash("sha256")
        .update(await readFile(new URL(match[2], packageDirectory)))
        .digest("hex");
      assert.equal(digest, match[1], `checksum mismatch: ${match[2]}`);
    }),
  );
});
