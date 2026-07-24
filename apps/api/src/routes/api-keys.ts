import { Router, type Router as RouterType } from 'express';
import { requireAuth, requireMinRole } from '../middleware/auth';
import { createApiKey, listApiKeys, revokeApiKey } from '../controllers/api-keys.controller';

export const apiKeysRouter: RouterType = Router();

apiKeysRouter.use(requireAuth);

// Platform API keys are a tenant-owned credential minting real access —
// tenant_admin+ only (ALIGN-020).
apiKeysRouter.post('/', requireMinRole('tenant_admin'), createApiKey);
apiKeysRouter.get('/', requireMinRole('tenant_admin'), listApiKeys);
apiKeysRouter.delete('/:id', requireMinRole('tenant_admin'), revokeApiKey);
