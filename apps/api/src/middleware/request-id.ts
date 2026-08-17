import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';

/** Attaches a unique request ID to every request for log correlation. */
export function requestId(req: Request, res: Response, next: NextFunction) {
  const id = (req.headers['x-request-id'] as string) || randomUUID();
  req.headers['x-request-id'] = id;
  res.setHeader('x-request-id', id);
  next();
}
