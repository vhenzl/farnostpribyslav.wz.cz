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

export function parseFotkyPopisek(str: string): string[] {
  const params = new URLSearchParams(str);
  const captions = params.getAll('fp[]');
  return captions;
}

export function fotoPath(rok: number, slug: string, idx: number): string {
  return `/foto/${rok}_${slug}_${idx}.jpg`;
}
