import { defineConfig } from "drizzle-kit";
import "dotenv/config";

const host = process.env.DATABASE_HOST || "localhost";
const port = process.env.DATABASE_PORT || "5432";
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DB;

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgresql://${user}:${password}@${host}:${port}/${database}`,
  },
});