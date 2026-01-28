import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config(); // pour les tests. temporaire

const pool = new Pool({
    connectionString: process.env.PSQL_CONNECTION_URL
});

// Abstraction du pool.query de pg, pour notre propre usage.
export async function query(sql: string, params: unknown[] = []) {
    const { rows } = await pool.query(sql, params);
    return rows;
}
