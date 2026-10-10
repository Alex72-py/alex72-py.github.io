import {
  cp,
  mkdir,
  readFile,
  writeFile,
  access,
  readdir,
} from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = path.join(root, "dist");
const source = await readFile(
  path.join(root, "client/src/data/portfolio.ts"),
  "utf8",
);
const compiled = ts.transpile(source, { module: ts.ModuleKind.ESNext });
const { portfolio } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
const ids = new Set();
for (const piece of portfolio.gallery) {
  if (!piece.id || ids.has(piece.id))
    throw new Error("Every artwork must have a unique id.");
  ids.add(piece.id);
  if (!piece.alt || !(piece.width > 0) || !(piece.height > 0)) {
    throw new Error(`Add alt text and positive dimensions for ${piece.id}.`);
  }
  for (const url of [piece.image, piece.fullImage]) {
    if (!url.startsWith("/artworks/") || url.includes("..")) {
      throw new Error(`Use a local /artworks/ path for ${piece.id}: ${url}`);
    }
    await access(path.join(root, url.slice(1)));
  }
}
const site = portfolio.siteUrl.replace(/\/$/, "");
if (site !== "https://alex72-py.github.io")
  throw new Error("Update site metadata together before changing domain.");
await mkdir(dist, { recursive: true });
await cp(path.join(root, "artworks"), path.join(dist, "artworks"), {
  recursive: true,
});
const html = await readFile(path.join(dist, "index.html"), "utf8");
if (/manus-storage|__manus__|VITE_ANALYTICS|BUILT_IN_FORGE/.test(html)) {
  throw new Error(
    "The production page contains a hosting-specific dependency.",
  );
}
await writeFile(path.join(dist, ".nojekyll"), "");
await writeFile(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`,
);
await writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${site}/</loc></url>\n  <url><loc>${site}/terms</loc></url>\n</urlset>\n`,
);
const terms = html
  .replace(/<title>[^<]*<\/title>/, "<title>Commission Terms | Alex</title>")
  .replace(
    `rel="canonical" href="${site}/"`,
    `rel="canonical" href="${site}/terms"`,
  );
await mkdir(path.join(dist, "terms"), { recursive: true });
await writeFile(path.join(dist, "terms/index.html"), terms);
const notFound = html
  .replace(/<title>[^<]*<\/title>/, "<title>Page Not Found | Alex</title>")
  .replace(
    'name="robots" content="index, follow"',
    'name="robots" content="noindex, follow"',
  );
await writeFile(path.join(dist, "404.html"), notFound);
console.log(
  `Prepared ${portfolio.gallery.length} artwork entries, ${(await readdir(path.join(dist, "artworks"))).length} image files, Terms and 404 for GitHub Pages.`,
);
