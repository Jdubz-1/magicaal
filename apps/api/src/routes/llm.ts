import { Router, type Router as RouterType } from 'express';
import { requireAuth, requireMinRole } from '../middleware/auth';
import {
  getProviderHealth,
  listRouterPolicies,
  createRouterPolicy,
  updateRouterPolicy,
  deleteRouterPolicy,
} from '../controllers/llm.controller';

export const llmRouter: RouterType = Router();

llmRouter.use(requireAuth);

// Provider health — readable by all authenticated users (SDK + dashboards)
llmRouter.get('/health', getProviderHealth);

// Router policy CRUD — developer+ to read, tenant_admin to mutate
llmRouter.get('/router-policies', listRouterPolicies);
llmRouter.post('/router-policies', requireMinRole('tenant_admin'), createRouterPolicy);
llmRouter.patch('/router-policies/:id', requireMinRole('tenant_admin'), updateRouterPolicy);
llmRouter.delete('/router-policies/:id', requireMinRole('tenant_admin'), deleteRouterPolicy);
