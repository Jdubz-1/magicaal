import { Router, type Router as RouterType } from 'express';
import { healthRouter } from './health';
import { authRouter } from './auth';
import { usersRouter } from './users';
import { tenantsRouter } from './tenants';
import { agentsRouter } from './agents';
import { systemRouter } from './system';
import { llmRouter } from './llm';
import { integrationsRouter } from './integrations';
import { telemetryRouter } from './telemetry';
import { datasourcesRouter } from './datasources';
import { mcpServersRouter } from './mcp-servers';
import { utilsRouter } from './utils';
import { promptsRouter } from './prompts';
import { caalRouter } from './caal';
import { marketplaceRouter } from './marketplace';
import { buildOpenApiSpec } from '../openapi/spec';
import { internalSessionRouter } from './sessions';
import { handleWebhook } from '../controllers/webhook.controller';
import { receiveIntegrationEvent } from '../controllers/integration-triggers.controller';

export const router: RouterType = Router();

router.use(healthRouter);
router.use('/v1/auth', authRouter);
router.use('/v1/users', usersRouter);
router.use('/v1/tenants', tenantsRouter);
router.use('/v1/agents', agentsRouter);
router.use('/v1/llm', llmRouter);
router.use('/v1/integrations', integrationsRouter);
router.use('/v1/telemetry', telemetryRouter);
router.use('/v1/datasources', datasourcesRouter);
router.use('/v1/mcp-servers', mcpServersRouter);
router.use('/v1/utils', utilsRouter);
router.use('/v1/prompts', promptsRouter);
router.use('/v1/caal', caalRouter);
router.use('/v1/marketplace', marketplaceRouter);
// OpenAPI document — public, the source for the published API reference
router.get('/v1/openapi.json', (_req, res) => {
  res.json(buildOpenApiSpec());
});
// Internal engine→API session endpoints
router.use('/internal/sessions', internalSessionRouter);
// Public webhook endpoint — no auth middleware; secret is in URL
router.post('/v1/agents/:id/webhook/:secret', handleWebhook);
// Public integration trigger receiver — no auth middleware; authenticity is
// established by the service's webhook signature, verified in the engine
router.post('/v1/triggers/integrations/:service/:tenantSlug', receiveIntegrationEvent);
router.use('/v1', systemRouter);
