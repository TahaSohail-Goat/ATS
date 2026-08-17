import type { Response } from 'express';

/**
 * Standard success response envelope.
 * See docs/api/conventions.md — do not shape responses ad hoc.
 */
export function sendSuccess<T>(res: Response, data: T, statusCode = 200): void {
  const requestId = res.req.headers['x-request-id'];
  res.status(statusCode).json({
    success: true,
    data,
    meta: { requestId },
  });
}
