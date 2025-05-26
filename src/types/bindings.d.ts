import { D1Database } from '@cloudflare/workers-types';
import { Env } from 'hono';

export type Environment = Env & {
  Bindings: {
    DB: D1Database;
  };
};
