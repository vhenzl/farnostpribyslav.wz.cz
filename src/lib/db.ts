import 'dotenv/config';
import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

// Single-source DB configuration: require DATABASE_URL
export function getPool(): mysql.Pool {
  if (!pool) {
    const url = process.env['DATABASE_URL'];
    if (!url) throw new Error('Missing required env DATABASE_URL');
    // Note: We rely on MySQL server/session timezone; data are stored in Prague time.
    // We format dates in SQL (DATE_FORMAT) to strings, avoiding JS timezone conversions.
    pool = mysql.createPool(url);
  }
  return pool;
}

export async function query<T = unknown>(sql: string, params: Array<string | number | null> = []) {
  const [rows] = await getPool().query(sql, params);
  return rows as T[];
}
