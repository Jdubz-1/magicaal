import { Router, type Router as RouterType } from 'express';
import { requireAuth, requireMinRole } from '../middleware/auth';
import {
  getSystemHealth,
  listNodes,
  getProviderPricing,
  upsertProviderPricing,
  getLastSyncEvent,
  listSyncEvents,
} from '../controllers/system.controller';

export const systemRouter: RouterType = Router();

systemRouter.get('/system', requireAuth, getSystemHealth);
systemRouter.get('/nodes', requireAuth, listNodes);
systemRouter.get('/system/provider-pricing', requireAuth, getProviderPricing);
systemRouter.post('/system/provider-pricing', requireAuth, requireMinRole('tenant_admin'), upsertProviderPricing);
systemRouter.get('/system/sync', requireAuth, getLastSyncEvent);
systemRouter.get('/system/sync/log', requireAuth, listSyncEvents);
