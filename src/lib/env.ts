import { D1Database } from '@cloudflare/workers-types';
import { Env } from 'hono';

export type Environment = {
  Bindings: {
    DB: D1Database;
    ENVIRONMENT?: string;
    JWT_SECRET: string;
    JWT_ACCESS_EXPIRES_IN: string;
    RESEND_API_KEY: string;
    FROM_EMAIL: string;
  };
  Variables: {
    jwtPayload?: {
      userId: string;
      role: string;
    };
  };
};