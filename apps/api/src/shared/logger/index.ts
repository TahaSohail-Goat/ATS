import pino from 'pino';
import { env } from '../../config/env.js';

/**
 * Structured JSON logger. Never use console.log in committed code —
 * always go through this logger so logs are structured, leveled, and
 * carry request context (see middleware/request-id.ts + pino-http wiring
 * in app.ts).
 */
export const logger = pino({
  level: env.LOG_LEVEL,
  transport:
    env.NODE_ENV === 'development'
      ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'HH:MM:ss' } }
      : undefined,
  redact: ['req.headers.authorization', 'req.headers.cookie', '*.password', '*.token'],
});
