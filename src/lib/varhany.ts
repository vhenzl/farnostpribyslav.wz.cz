import matter from 'gray-matter';
import fs from 'node:fs/promises';
import path from 'node:path';

export type VarhanyItem = { slug: string; title: string; bodyHtml: string };

const dir = path.join(process.cwd(), 'data', 'varhany');

export async function listVarhany(): Promise<VarhanyItem[]> {
  const files = await fs.readdir(dir);
  const md = files.filter(f => f.endsWith('.md')).sort();
  const out: VarhanyItem[] = [];
  for (const file of md) {
    const full = path.join(dir, file);
    const raw = await fs.readFile(full, 'utf8');
    const { data, content } = matter(raw);
    const fm = data as Record<string, unknown>;
    out.push({ slug: String(fm['slug']), title: String(fm['title']), bodyHtml: content.trim() });
  }
  return out;
}

export async function getVarhanyBySlug(slug: string): Promise<VarhanyItem | null> {
  const all = await listVarhany();
  return all.find(i => i.slug === slug) ?? null;
}
