import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the TRS concept site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>拓尔思 TRS｜让数据成为可行动的智能<\/title>/i);
  assert.match(html, /让数据成为/);
  assert.match(html, /可行动的智能/);
  assert.match(html, /产品与能力/);
  assert.match(html, /行业方案/);
  assert.match(html, /10,000\+/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("keeps content, sections, and interactive visuals separated", async () => {
  const [page, data, scene, explorer, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/site-content.ts", import.meta.url), "utf8"),
    readFile(
      new URL("../app/components/site/DataCoreScene.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../app/components/site/ProductExplorer.tsx", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<HeroSection \/>/);
  assert.match(page, /<PlatformSection \/>/);
  assert.match(page, /<IndustriesSection \/>/);
  assert.match(data, /export const productCategories/);
  assert.match(data, /export const industries/);
  assert.match(scene, /new THREE\.WebGLRenderer/);
  assert.match(scene, /prefers-reduced-motion/);
  assert.match(explorer, /role="tablist"/);
  assert.match(css, /@media \(max-width: 620px\)/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

});
