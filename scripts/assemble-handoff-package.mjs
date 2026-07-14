import { createHash } from "node:crypto";
import {
  copyFile,
  cp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectDirectory = new URL("../", import.meta.url);
const outputDirectory = new URL("out/", projectDirectory);
const packageDirectory = new URL("handoff-package/", projectDirectory);
const siteDirectory = new URL("site/", packageDirectory);

await rm(packageDirectory, { recursive: true, force: true });
await mkdir(packageDirectory, { recursive: true });
await cp(outputDirectory, siteDirectory, { recursive: true });

await copyFile(
  new URL("docs/PRODUCTION-HANDOFF.md", projectDirectory),
  new URL("上线交接指南.md", packageDirectory),
);
await copyFile(
  new URL("handoff-manifest.json", outputDirectory),
  new URL("handoff-manifest.json", packageDirectory),
);
await copyFile(
  new URL("docs/EDITING-GUIDE.md", projectDirectory),
  new URL("EDITING-GUIDE.md", packageDirectory),
);
await copyFile(
  new URL("docs/CONTENT-SOURCES.md", projectDirectory),
  new URL("CONTENT-SOURCES.md", packageDirectory),
);

// The manifest is an internal handoff record, not a public website asset.
await rm(new URL("handoff-manifest.json", siteDirectory));

const packagePath = fileURLToPath(packageDirectory);

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(entryPath)));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

const packageFiles = await listFiles(packagePath);
const checksums = await Promise.all(
  packageFiles.sort().map(async (filePath) => {
    const digest = createHash("sha256")
      .update(await readFile(filePath))
      .digest("hex");
    const relativePath = path
      .relative(packagePath, filePath)
      .split(path.sep)
      .join("/");
    return `${digest}  ${relativePath}`;
  }),
);

await writeFile(
  new URL("checksums.sha256", packageDirectory),
  `${checksums.join("\n")}\n`,
  "utf8",
);
