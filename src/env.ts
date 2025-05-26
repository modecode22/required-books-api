/* eslint-disable node/no-process-env */
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";
import { z } from "zod";

expand(
  config({
    path: path.resolve(process.cwd(), process.env.Environment === "test" ? ".env.test" : ".env"),
  }),
);

const EnvSchema = z.object({
  Environment: z.string().default("development"),
  PORT: z.coerce.number().default(9999),
  D1_TOKEN: z.string(),
  ACCOUNT_ID: z.string(),
  DATABASE_ID: z.string(),

});

export type env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line ts/no-redeclare
const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

export default env!;
