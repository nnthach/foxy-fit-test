import { Pool } from "pg";

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
  console.error("Lỗi không mong muốn từ PostgreSQL client đang idle:", err);
  process.exit(1);
});
