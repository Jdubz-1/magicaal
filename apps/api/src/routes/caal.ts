import { Router, type Router as RouterType } from 'express';
import { requireAuth, requireMinRole } from '../middleware/auth';
import { invokeCaal, getCaalSession } from '../controllers/caal.controller';
import { getCaalConfig, upsertCaalConfig } from '../controllers/caal-config.controller';

export const caalRouter: RouterType = Router();

// Caal invocation — requires any authenticated user
caalRouter.post('/invoke', requireAuth, invokeCaal);

// Caal session history — per-user, per-target-agent
caalRouter.get('/sessions/:agentId', requireAuth, getCaalSession);

// Caal configuration — tenant admins only
caalRouter.get('/config', requireAuth, getCaalConfig);
caalRouter.patch('/config', requireAuth, requireMinRole('tenant_admin'), upsertCaalConfig);
