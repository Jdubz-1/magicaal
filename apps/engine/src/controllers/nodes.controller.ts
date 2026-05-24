import type { RequestHandler } from 'express';
import { registry } from '../registry/node-registry';

export const listNodes: RequestHandler = (_req, res, next) => {
  try {
    const nodes = registry.listAll().map((m) => ({
      type: m.type,
      meta: m.meta,
      schema: m.schema,
    }));
    res.json(nodes);
  } catch (err) {
    next(err);
  }
};
