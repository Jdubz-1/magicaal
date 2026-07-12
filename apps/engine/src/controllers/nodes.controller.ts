import type { RequestHandler } from 'express';
import { registry } from '../registry/node-registry';

export const listNodes: RequestHandler = (_req, res, next) => {
  try {
    const nodes = registry.listAll().map((m) => ({
      type: m.type,
      meta: m.meta,
      schema: m.schema,
      // Undefined for built-ins. The API filters package nodes down to the
      // calling tenant's entitlements before they reach the Studio palette.
      packageId: registry.packageOf(m.type),
    }));
    res.json(nodes);
  } catch (err) {
    next(err);
  }
};
