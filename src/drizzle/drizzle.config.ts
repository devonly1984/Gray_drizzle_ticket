import {config} from 'dotenv'
import {defineConfig} from 'drizzle-kit'
config({ path: ".env.local" });
export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/tables",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});