import { RequestHandler } from 'express';

export const healthController: RequestHandler = (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
};
