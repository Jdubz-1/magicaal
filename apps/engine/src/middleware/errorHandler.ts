import { ErrorRequestHandler } from 'express';
import { logger } from '../lib/logger';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error(err);
  const typed = err as { status?: number; statusCode?: number; code?: string };
  const status: number = typed.status ?? typed.statusCode ?? 500;
  const message: string = (err as Error).message ?? 'Internal Server Error';

  // Controllers attach a machine-readable `code` alongside `status` (e.g.
  // INVALID_KEY, AGENT_NOT_FOUND) — surface it so the API can branch on the
  // error instead of parsing the message.
  res.status(status).json({ error: message, ...(typed.code && { code: typed.code }) });
};
