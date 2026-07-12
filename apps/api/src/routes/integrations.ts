import { Router, type Router as RouterType } from 'express';
import { requireAuth, requireMinRole } from '../middleware/auth';
import {
  listConnections,
  getConnection,
  createConnection,
  updateConnection,
  deleteConnection,
  initiateOAuth,
} from '../controllers/integrations.controller';
import {
  listOAuthApps,
  upsertOAuthApp,
  deleteOAuthApp,
} from '../controllers/oauth-apps.controller';
import {
  listIntegrationTypes,
  listTriggers,
  createTrigger,
  deleteTrigger,
} from '../controllers/integration-triggers.controller';

export const integrationsRouter: RouterType = Router();

integrationsRouter.use(requireAuth);

// Available integration types (from the engine's integration registry)
integrationsRouter.get('/', listIntegrationTypes);

// Integration trigger registrations
integrationsRouter.get('/triggers', listTriggers);
integrationsRouter.post('/triggers', requireMinRole('tenant_admin'), createTrigger);
integrationsRouter.delete('/triggers/:id', requireMinRole('tenant_admin'), deleteTrigger);

// Integration Connections CRUD
integrationsRouter.get('/connections', listConnections);
integrationsRouter.get('/connections/:id', getConnection);
integrationsRouter.post('/connections', requireMinRole('tenant_admin'), createConnection);
integrationsRouter.patch('/connections/:id', requireMinRole('tenant_admin'), updateConnection);
integrationsRouter.delete('/connections/:id', requireMinRole('tenant_admin'), deleteConnection);

// OAuth client applications (per tenant + service)
integrationsRouter.get('/oauth-apps', requireMinRole('tenant_admin'), listOAuthApps);
integrationsRouter.put('/oauth-apps', requireMinRole('tenant_admin'), upsertOAuthApp);
integrationsRouter.delete('/oauth-apps/:id', requireMinRole('tenant_admin'), deleteOAuthApp);

// OAuth flow. The provider's callback redirect carries no bearer token, so
// GET /oauth/:service/callback is mounted publicly in routes/index.ts.
integrationsRouter.post('/oauth/initiate', requireMinRole('tenant_admin'), initiateOAuth);
