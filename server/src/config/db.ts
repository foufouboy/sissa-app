import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();

const connectionString = process.env.PSQL_URL;

if (!connectionString) {
  throw new Error("PSQL_URL is not defined in environment variables");
}

export const pool = new Pool({
  connectionString,
});

export async function query<T>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const { rows } = await pool.query(sql, params);
  return rows;
}
