import type { RequestHandler } from 'express';
import { engineClient } from '@/lib/engine-client';

export const getSystemHealth: RequestHandler = async (_req, res, next) => {
  try {
    let engineStatus: 'ok' | 'unreachable' = 'unreachable';

    try {
      await engineClient.get('/health', { timeout: 3000 });
      engineStatus = 'ok';
    } catch {
      // engine unreachable
    }

    res.json({ api: 'ok', engine: engineStatus });
  } catch (err) {
    next(err);
  }
};

export const listNodes: RequestHandler = async (_req, res, next) => {
  try {
    const response = await engineClient.get('/internal/nodes');
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};
