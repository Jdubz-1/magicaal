import type { RequestHandler } from 'express';
import { config } from '../config';

/**
 * Gates Marketplace routes behind MARKETPLACE_ENABLED. The routes exist and
 * are registered in every deployment, but return 503 until the hosted
 * Marketplace service is live and the deployment opts in. The air-gapped
 * bundle upload route is mounted outside this gate.
 */
export const requireMarketplaceEnabled: RequestHandler = (_req, res, next) => {
  if (!config.marketplaceEnabled) {
    res.status(503).json({
      error: 'Marketplace connectivity is disabled',
      code: 'MARKETPLACE_DISABLED',
      hint: 'Set MARKETPLACE_ENABLED=true once a MagiCaal Marketplace account is available. Air-gapped package installs via POST /v1/marketplace/licenses/bundle work without it.',
    });
    return;
  }
  next();
};
