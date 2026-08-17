import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema/index.js";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: process.env.DATABASE_HOST || "localhost",
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on("error", (err: Error) => {
  console.error("Unexpected error from idle PostgreSQL client:", err);
  process.exit(1);
});

export const db = drizzle(pool, { schema });
