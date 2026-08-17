import { PrismaClient } from '@prisma/client';
import { env } from './env.js';

/**
 * Single shared Prisma client instance. Repositories import this —
 * never instantiate a new PrismaClient elsewhere.
 */
export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});
