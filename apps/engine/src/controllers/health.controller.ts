import { RequestHandler } from 'express';

export const healthController: RequestHandler = (_req, res) => {
  res.json({ status: 'OK', service: 'engine', timestamp: new Date().toISOString() });
};
