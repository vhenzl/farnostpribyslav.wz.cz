#!/usr/bin/env node
/**
 * Generate static HTML redirect stubs for legacy URLs under public/legacy/zpravy/
 * Each stub immediately redirects to the new canonical path and provides a clickable link.
 */
import dotenv from 'dotenv';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAllZpravy } from '../lib/content.ts';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const outDir = path.join(repoRoot, 'public', 'legacy', 'zpravy');

/** Build a minimal redirect page */
function html(target) {
  return `<!doctype html>
<html lang="cs">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=${target}">
    <link rel="canonical" href="${target}" />
    <meta name="robots" content="noindex" />
    <title>Přesměrování…</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, "Apple Color Emoji", "Segoe UI Emoji"; padding: 2rem; line-height: 1.5; }
      a { color: #0b67ff; }
      code { background: #f2f2f2; padding: 0.1rem 0.3rem; border-radius: 4px; }
    </style>
  </head>
  <body>
    <h1>Přesměrování…</h1>
    <p>Nová adresa: <a href="${target}">${target}</a></p>
  </body>
</html>`;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const all = await getAllZpravy();
  // For each zprava, create an idr-based and a combined-based stub
  const tasks = [];
  for (const z of all) {
    const target = `/zpravy/${z.rok}-${z.idr}`;
    // Common legacy patterns observed in old site
    const files = [
      `${z.idr}.html`, // e.g., index.php?page=2&idr=14 might have been linked as 14.html in some dumps
      `${z.rok}-${z.idr}.html`, // combined key
    ];
    for (const f of files) {
      const p = path.join(outDir, f);
      tasks.push(writeFile(p, html(target), 'utf8'));
    }
  }
  await Promise.all(tasks);
  console.log(`Generated ${tasks.length} legacy redirect stubs in ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
