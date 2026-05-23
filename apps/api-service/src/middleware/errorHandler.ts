import { ErrorRequestHandler } from 'express';
import { logger } from '../lib/logger';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error(err);
  const status: number = (err as { status?: number; statusCode?: number }).status
    ?? (err as { status?: number; statusCode?: number }).statusCode
    ?? 500;
  const message: string = (err as Error).message ?? 'Internal Server Error';
  res.status(status).json({ error: message });
};
