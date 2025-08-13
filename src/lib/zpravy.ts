import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { z } from 'zod';

const dir = path.join(process.cwd(), 'data', 'zpravy');

const ZpravaSchema = z.object({
  id: z.int(),
  rok: z.int(),
  idr: z.int(),
  nazev: z.string(),
  text: z.string(),
  autor: z.string(),
  vlozil: z.int(),
  datum_iso: z.string(), // DATETIME 'YYYY-MM-DD HH:mm:ss' in Europe/Prague time zone
  datum: z.string(),
  upravil: z.int().nullable(),
  upravil_datum: z.string().nullable(),
  foto_pocet: z.int(),
  foto_nazev: z.string(),
  fotky: z.array(z.string()).nullable(),
}).strict();

export type Zprava = z.infer<typeof ZpravaSchema>;

async function readZpravaFile(file: string): Promise<Zprava> {
  const filePath = path.join(dir, file);
  const raw = await fs.readFile(filePath, { encoding: 'utf8' });
  const { data: frontmatter, content } = matter(raw);
  const zprava = { ...frontmatter, text: content };
  const fileId = parseInt(file.replace('.md', ''), 10);

  try {
    return ZpravaSchema.parse(zprava);
  } catch (e) {
    console.error(`Validation failed for zprava ${fileId}:`, e);
    throw e;
  }
}

export async function getAllZpravy(): Promise<Zprava[]> {
  const files = (await fs.readdir(dir)).filter((f: string) => f.endsWith('.md'));
  const zpravy = await Promise.all(files.map(file => readZpravaFile(file)));
  return zpravy.sort((a, b) => {
    if (b.rok !== a.rok) return b.rok - a.rok;
    return b.idr - a.idr;
  });
}

export async function getYearsSummary(): Promise<number[]> {
  const zpravy = await getAllZpravy();
  return Array.from(new Set(zpravy.map(z => z.rok))).sort((a, b) => a - b);
}

export async function getZpravaBySlug(slug: string): Promise<{
  item: Zprava;
  prev?: Zprava;
  next?: Zprava;
}> {
  const [rokStr, idrStr] = slug.split('-');
  const rok = Number(rokStr);
  const idr = Number(idrStr);
  if (!Number.isFinite(rok) || !Number.isFinite(idr)) throw new Error('Invalid slug');

  const allZpravy = await getAllZpravy();

  const item = allZpravy.find(x => x.rok === rok && x.idr === idr);
  if (!item) throw new Error('NOT_FOUND');

  const years = Array.from(new Set(allZpravy.map(z => z.rok))).sort((a, b) => a - b);

  // Find all zpravy in the same year, sorted by idr
  const sameYearZpravy = allZpravy.filter(z => z.rok === rok).sort((a, b) => a.idr - b.idr);

  // Find index of current item
  const idx = sameYearZpravy.findIndex(z => z.idr === idr);

  // Determine prev (within same year if possible, else wrap to previous year max)
  let prev: Zprava | undefined;
  if (idx > 0) {
    // Previous in the same year
    prev = sameYearZpravy[idx - 1];
  } else {
    // Last previous year
    const prevYearIdx = years.findIndex(y => y === rok) - 1;
    if (prevYearIdx >= 0) {
      const prevYear = years[prevYearIdx];
      const prevYearZpravy = allZpravy.filter(z => z.rok === prevYear).sort((a, b) => a.idr - b.idr);
      prev = prevYearZpravy[prevYearZpravy.length - 1];
    }
  }

  // Determine next (within same year, else wrap to next year min)
  let next: Zprava | undefined;
  if (idx >= 0 && idx < sameYearZpravy.length - 1) {
    // Next in the same year
    next = sameYearZpravy[idx + 1];
  } else {
    // First next year
    const nextYearIdx = years.findIndex(y => y === rok) + 1;
    if (nextYearIdx < years.length) {
      const nextYear = years[nextYearIdx];
      const nextYearZpravy = allZpravy.filter(z => z.rok === nextYear).sort((a, b) => a.idr - b.idr);
      next = nextYearZpravy[0];
    }
  }

  const result: { item: Zprava } & Partial<{ prev: Zprava; next: Zprava }> = { item };
  if (prev) result.prev = prev;
  if (next) result.next = next;
  return result;
}

export function fotoPath(rok: number, slug: string, idx: number): string {
  return `/foto/${rok}_${slug}_${idx}.jpg`;
}
