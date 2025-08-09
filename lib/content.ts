import { query } from './db.ts';

export type Zprava = {
  id: number;
  idr: number;
  rok: number;
  nazev: string;
  text: string;
  autor: string;
  foto_nazev: string;
  foto_pocet: number;
  foto_popisek: string;
  vlozil: number;
  datum_utc: string;
};

export type Publisher = { id: number; name: string; email: string };

export async function getAllZpravy(): Promise<Zprava[]> {
  const rows = await query<Zprava>(
    `SELECT id, idr, rok, nazev, text, autor, foto_nazev, foto_pocet, foto_popisek, vlozil, DATE_FORMAT(datum_utc, '%Y-%m-%d %H:%i:%s') as datum_utc
     FROM tab_zpravy
  ORDER BY rok DESC, idr DESC`,
  );
  return rows;
}

export async function getYearsSummary(): Promise<number[]> {
  const rows = await query<{ rok: number }>(
    'SELECT DISTINCT rok FROM tab_zpravy ORDER BY rok DESC',
  );
  return rows.map(r => r.rok);
}

export async function getPublishersMap(): Promise<Map<number, Publisher>> {
  const rows = await query<{
    id: number;
    jmeno: string;
    prijmeni: string;
    email: string;
  }>('SELECT id, jmeno, prijmeni, email FROM tab_red_user ORDER BY id');
  const map = new Map<number, Publisher>();
  for (const r of rows) {
    map.set(r.id, { id: r.id, name: `${r.jmeno} ${r.prijmeni}`.trim(), email: r.email });
  }
  return map;
}

export function parseFotkyPopisek(str: string): string[] {
  const params = new URLSearchParams(str);
  const captions = params.getAll('fp[]');
  return captions;
}

export function fotoPath(rok: number, slug: string, idx: number): string {
  return `/foto/${rok}_${slug}_${idx}.jpg`;
}
