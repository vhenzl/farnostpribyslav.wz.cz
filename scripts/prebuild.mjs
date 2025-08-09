import fs from 'node:fs/promises';
import path from 'node:path';

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  await Promise.all(entries.map(async (e) => {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }));
}

const repoRoot = process.cwd();
const from = path.join(repoRoot, 'data', 'foto');
const to = path.join(repoRoot, 'public', 'foto');

try {
  await copyDir(from, to);
  console.log('Copied photos to public/foto');
} catch (err) {
  console.warn('Skipping photo copy:', err?.message ?? String(err));
}
