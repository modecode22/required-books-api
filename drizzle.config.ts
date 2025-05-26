import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
config({ path: ".env" })

export default defineConfig({
  dialect: 'sqlite',
  driver: 'd1-http',
  out: 'migrations',
  schema: './src/db/schema.ts',
  dbCredentials: {
    token: process.env.D1_TOKEN!,
    accountId: process.env.ACCOUNT_ID!,
    databaseId: process.env.DATABASE_ID!
  },
});
