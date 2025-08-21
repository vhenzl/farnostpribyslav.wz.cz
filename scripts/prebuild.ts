import fs from 'node:fs/promises';
import path from 'node:path';

async function copyDir(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  await Promise.all(entries.map(async (e) => {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }));
}

async function copyDirFromDataToPublic(dir: string) {
  const repoRoot = process.cwd();
  const from = path.join(repoRoot, 'data', dir);
  const to = path.join(repoRoot, 'public', dir);
  await copyDir(from, to);
}

try {
  await copyDirFromDataToPublic('foto');
  await copyDirFromDataToPublic('obr');
  console.log('Copied data to public');
} catch (err) {
  console.warn('Data copy failed:', err instanceof Error ? err.message : String(err));
  process.exit(1);
}
