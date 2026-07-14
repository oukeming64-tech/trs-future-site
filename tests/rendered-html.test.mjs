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
  const [
    page,
    data,
    scene,
    explorer,
    industries,
    hero,
    brand,
    blueprints,
    miniScene,
    miniCss,
    css,
    packageJson,
  ] = await Promise.all([
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
    readFile(
      new URL("../app/components/sections/IndustriesSection.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../app/components/sections/HeroSection.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../app/components/site/BrandMark.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../app/components/visuals/mini-3d-blueprints.ts", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../app/components/visuals/Mini3DScene.tsx", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../app/mini-3d.css", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const contentVisuals = [
    ...data.matchAll(/^\s+visual: "([a-z0-9-]+)",$/gm),
  ].map((match) => match[1]);
  const blueprintIds = [
    ...blueprints.matchAll(/^  "([a-z0-9-]+)": \{$/gm),
  ].map((match) => match[1]);

  assert.match(page, /<HeroSection \/>/);
  assert.match(page, /<PlatformSection \/>/);
  assert.match(page, /<IndustriesSection \/>/);
  assert.match(data, /export const productCategories/);
  assert.match(data, /export const industries/);
  assert.match(scene, /new THREE\.WebGLRenderer/);
  assert.match(scene, /prefers-reduced-motion/);
  assert.match(explorer, /role="tablist"/);
  assert.match(explorer, /<Mini3DScene/);
  assert.match(industries, /<Mini3DScene/);
  assert.match(hero, /<Mini3DScene/);
  assert.match(brand, /src="\/trs-logo\.png"/);
  assert.equal(contentVisuals.length, 35);
  assert.equal(new Set(contentVisuals).size, 35);
  assert.deepEqual(
    [...blueprintIds].sort(),
    [...contentVisuals].sort(),
    "every lifecycle, product, and industry visual must have one blueprint",
  );
  assert.match(miniScene, /MINI_3D_BLUEPRINTS\[model\]/);
  assert.match(miniCss, /perspective: 720px/);
  assert.match(miniCss, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media \(max-width: 620px\)/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
