import 'dotenv/config';
import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

// Single-source DB configuration: require DATABASE_URL
export function getPool(): mysql.Pool {
  if (!pool) {
    const url = process.env['DATABASE_URL'];
    if (!url) throw new Error('Missing required env DATABASE_URL');
    pool = mysql.createPool({
      uri: url,
      // timezone can be only 'Z', 'local' or offset;
      // TZs like Europe/Prague are not supported by mysql2
      dateStrings: true, // prevents automatic conversion to Date
      timezone: 'local', // the default, but let's be explicit
    });
    pool.on('connection', (conn) => {
      // Set session time zone to Europe/Prague for each connection
      void conn.query("SET time_zone = 'Europe/Prague'");
    });
  }
  return pool;
}

export async function query<T = unknown>(sql: string, params: Array<string | number | null> = []) {
  const [rows] = await getPool().query(sql, params);
  return rows as T[];
}
