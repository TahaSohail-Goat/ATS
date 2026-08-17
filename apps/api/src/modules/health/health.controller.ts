import type { Request, Response } from 'express';
import { sendSuccess } from '../../shared/validation/respond.js';
import { checkDatabaseConnection } from './health.service.js';

export function getHealth(_req: Request, res: Response) {
  sendSuccess(res, { status: 'ok', uptime: process.uptime() });
}

export async function getReadiness(_req: Request, res: Response) {
  const dbOk = await checkDatabaseConnection();
  if (!dbOk) {
    res.status(503).json({
      success: false,
      error: { code: 'NOT_READY', message: 'Database connection unavailable' },
    });
    return;
  }
  sendSuccess(res, { status: 'ready' });
}
