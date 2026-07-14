import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputDirectory = new URL("../out/", import.meta.url);

test("exports the TRS concept site for GitHub Pages", async () => {
  const html = await readFile(new URL("index.html", outputDirectory), "utf8");
  assert.match(html, /<title>拓尔思 TRS｜让数据成为可行动的智能<\/title>/i);
  assert.match(html, /让数据成为/);
  assert.match(html, /可行动的智能/);
  assert.match(html, /产品与能力/);
  assert.match(html, /行业方案/);
  assert.match(html, /10,000\+/);
  assert.match(html, /业务结果/);
  assert.match(html, /FACT CHECK \/ PRIMARY SOURCES/);
  assert.match(html, /2026\.07\.07/);
  assert.match(
    html,
    /https:\/\/oukeming64-tech\.github\.io\/trs-future-site\//,
  );
  assert.match(html, /\/trs-future-site\/_next\/static\//);
  assert.match(html, /\/trs-future-site\/trs-logo\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);

  const localAssets = [
    ...html.matchAll(/(?:href|src)="\/trs-future-site\/([^"?#]+)"/g),
  ].map((match) => match[1]);

  assert.ok(localAssets.length > 0);
  await Promise.all(
    [...new Set(localAssets)].map((asset) =>
      access(new URL(asset, outputDirectory)),
    ),
  );
});

test("keeps content, sections, and interactive visuals separated", async () => {
  const [
    page,
    data,
    scene,
    explorer,
    industries,
    about,
    hero,
    brand,
    blueprints,
    miniScene,
    miniCss,
    css,
    packageJson,
    nextConfig,
    pagesWorkflow,
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
      new URL("../app/components/sections/AboutSection.tsx", import.meta.url),
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
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(
      new URL("../.github/workflows/pages.yml", import.meta.url),
      "utf8",
    ),
  ]);

  const contentVisuals = [
    ...data.matchAll(/^\s+visual: "([a-z0-9-]+)",$/gm),
  ].map((match) => match[1]);
  const blueprintIds = [
    ...blueprints.matchAll(/^  "([a-z0-9-]+)": \{$/gm),
  ].map((match) => match[1]);
  const productOutcomes = [...data.matchAll(/^\s+outcome: "(.+)",$/gm)];
  const industryScenarios = [...data.matchAll(/^\s+scenarios: \[(.+)\],$/gm)]
    .flatMap((match) => [...match[1].matchAll(/"([^"]+)"/g)]);

  assert.match(page, /<HeroSection \/>/);
  assert.match(page, /<PlatformSection \/>/);
  assert.match(page, /<IndustriesSection \/>/);
  assert.match(data, /export const productCategories/);
  assert.match(data, /export const industries/);
  assert.match(scene, /new THREE\.WebGLRenderer/);
  assert.match(scene, /prefers-reduced-motion/);
  assert.match(explorer, /role="tablist"/);
  assert.match(explorer, /<Mini3DScene/);
  assert.match(explorer, /product-card__outcome/);
  assert.match(industries, /<Mini3DScene/);
  assert.match(industries, /industry-card__scenarios/);
  assert.match(about, /evidenceLinks/);
  assert.match(hero, /<Mini3DScene/);
  assert.match(brand, /NEXT_PUBLIC_BASE_PATH/);
  assert.equal(contentVisuals.length, 35);
  assert.equal(new Set(contentVisuals).size, 35);
  assert.equal(productOutcomes.length, 24);
  assert.equal(industryScenarios.length, 21);
  assert.match(data, /2026\.07\.07/);
  assert.match(data, /t20230629_10053\.html/);
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
  assert.doesNotMatch(packageJson, /vinext|wrangler|@cloudflare\/vite-plugin/);
  assert.match(packageJson, /build:pages/);
  assert.match(nextConfig, /output: "export"/);
  assert.match(nextConfig, /basePath/);
  assert.match(pagesWorkflow, /actions\/deploy-pages@v5/);
  assert.match(pagesWorkflow, /npm run build:pages/);
});
