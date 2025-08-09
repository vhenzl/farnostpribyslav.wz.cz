import 'dotenv/config';
import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function hasDbConfig(): boolean {
  return Boolean(
    process.env['DATABASE_URL'] ||
    (process.env['DB_HOST'] && process.env['DB_USER'] && process.env['DB_NAME']),
  );
}

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env ${name}`);
  return v;
}

export function getPool(): mysql.Pool {
  if (!pool) {
    const url = process.env['DATABASE_URL'];
    if (url) {
      pool = mysql.createPool(url);
    } else {
      const host = requiredEnv('DB_HOST');
      const user = requiredEnv('DB_USER');
      const database = requiredEnv('DB_NAME');
      const port = process.env['DB_PORT'] ? Number(process.env['DB_PORT']) : undefined;
      const password = process.env['DB_PASSWORD'];

      const cfg: mysql.PoolOptions = {
        host,
        user,
        database,
        connectionLimit: 4,
        timezone: 'Z',
        supportBigNumbers: true,
      };
      if (typeof port === 'number') cfg.port = port;
      if (typeof password === 'string') cfg.password = password;
      pool = mysql.createPool(cfg);
    }
  }
  return pool;
}

export async function query<T = unknown>(sql: string, params: Array<string | number | null> = []) {
  const [rows] = await getPool().query(sql, params);
  return rows as T[];
}
