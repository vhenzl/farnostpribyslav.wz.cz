import { z } from 'zod';
import { query } from './db.ts';

const ZpravaRow = z.object({
  id: z.number(),
  idr: z.number(),
  rok: z.number(),
  nazev: z.string(),
  text: z.string(),
  autor: z.string(),
  foto_nazev: z.string(),
  foto_pocet: z.number(),
  foto_popisek: z.string(),
  vlozil: z.number(),
  datum_iso: z.string(), // formatted as 'YYYY-MM-DD HH:mm:ss' in local time
});
export type Zprava = z.infer<typeof ZpravaRow>;

const PublisherRow = z.object({
  id: z.number(),
  jmeno: z.string(),
  prijmeni: z.string(),
  email: z.string().email().or(z.string().min(0)), // some rows may have missing/invalid emails
});
export type Publisher = { id: number; name: string; email: string };

export async function getAllZpravy(): Promise<Zprava[]> {
  const rows = await query<unknown>(
    `SELECT id, idr, rok, nazev, text, autor, foto_nazev, foto_pocet, foto_popisek, vlozil,
            DATE_FORMAT(datum_utc, '%Y-%m-%d %H:%i:%s') as datum_iso
       FROM tab_zpravy
   ORDER BY rok DESC, idr DESC`,
  );
  return rows.map(r => ZpravaRow.parse(r));
}

export async function getYearsSummary(): Promise<number[]> {
  const rows = await query<{ rok: number }>(
    'SELECT DISTINCT rok FROM tab_zpravy ORDER BY rok DESC',
  );
  return rows.map(r => r.rok);
}

export async function getPublisherById(id: number): Promise<Publisher | null> {
  const rows = await query<unknown>(
    'SELECT id, jmeno, prijmeni, email FROM tab_red_user WHERE id = ? LIMIT 1',
    [id],
  );
  if (rows.length === 0) return null;
  const r = PublisherRow.parse(rows[0]);
  return { id: r.id, name: `${r.jmeno} ${r.prijmeni}`.trim(), email: r.email };
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

  // Fetch the single item
  const itemRows = await query<unknown>(
    `SELECT id, idr, rok, nazev, text, autor, foto_nazev, foto_pocet, foto_popisek, vlozil,
            DATE_FORMAT(datum_utc, '%Y-%m-%d %H:%i:%s') as datum_iso
       FROM tab_zpravy WHERE rok = ? AND idr = ? LIMIT 1`,
    [rok, idr],
  );
  if (itemRows.length === 0) throw new Error('NOT_FOUND');
  const item = ZpravaRow.parse(itemRows[0]);

  // Determine prev (within same year if possible, else wrap to previous year max)
  const prevRows = await query<unknown>(
    `(
       SELECT id, idr, rok, nazev, text, autor, foto_nazev, foto_pocet, foto_popisek, vlozil,
              DATE_FORMAT(datum_utc, '%Y-%m-%d %H:%i:%s') as datum_iso
         FROM tab_zpravy
        WHERE rok = ? AND idr < ?
     ORDER BY idr DESC
        LIMIT 1
     )
     UNION ALL
     (
       SELECT z.* FROM (
         SELECT id, idr, rok, nazev, text, autor, foto_nazev, foto_pocet, foto_popisek, vlozil,
                DATE_FORMAT(datum_utc, '%Y-%m-%d %H:%i:%s') as datum_iso
           FROM tab_zpravy
          WHERE rok = (SELECT MAX(rok) FROM tab_zpravy WHERE rok < ?)
       ORDER BY idr DESC
          LIMIT 1
       ) z
     )
     LIMIT 1`,
    [rok, idr, rok],
  );
  const prev = prevRows.length ? ZpravaRow.parse(prevRows[0]) : undefined;

  // Determine next (within same year, else wrap to next year min)
  const nextRows = await query<unknown>(
    `(
       SELECT id, idr, rok, nazev, text, autor, foto_nazev, foto_pocet, foto_popisek, vlozil,
              DATE_FORMAT(datum_utc, '%Y-%m-%d %H:%i:%s') as datum_iso
         FROM tab_zpravy
        WHERE rok = ? AND idr > ?
     ORDER BY idr ASC
        LIMIT 1
     )
     UNION ALL
     (
       SELECT z.* FROM (
         SELECT id, idr, rok, nazev, text, autor, foto_nazev, foto_pocet, foto_popisek, vlozil,
                DATE_FORMAT(datum_utc, '%Y-%m-%d %H:%i:%s') as datum_iso
           FROM tab_zpravy
          WHERE rok = (SELECT MIN(rok) FROM tab_zpravy WHERE rok > ?)
       ORDER BY idr ASC
          LIMIT 1
       ) z
     )
     LIMIT 1`,
    [rok, idr, rok],
  );
  const next = nextRows.length ? ZpravaRow.parse(nextRows[0]) : undefined;

  const result: { item: Zprava } & Partial<{ prev: Zprava; next: Zprava }> = { item };
  if (prev) result.prev = prev;
  if (next) result.next = next;
  return result;
}

export function parseFotkyPopisek(str: string): string[] {
  const params = new URLSearchParams(str);
  const captions = params.getAll('fp[]');
  return captions;
}

export function fotoPath(rok: number, slug: string, idx: number): string {
  return `/foto/${rok}_${slug}_${idx}.jpg`;
}
