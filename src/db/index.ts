import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
import { D1Database } from '@cloudflare/workers-types';

export const initDbConnect = (db: D1Database) => drizzle(db, { schema });
