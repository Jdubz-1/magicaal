import { Router, type Router as RouterType } from 'express';
import { healthRouter } from './health';
import { authRouter } from './auth';
import { usersRouter } from './users';
import { tenantsRouter } from './tenants';
import { apiKeysRouter } from './api-keys';
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
import { internalSessionRouter, tenantSessionsRouter } from './sessions';
import { handleWebhook } from '../controllers/webhook.controller';
import { receiveIntegrationEvent } from '../controllers/integration-triggers.controller';
import { getRunDirect } from '../controllers/runs.controller';
import { runsRouter } from './runs';
import {
  internalUpdateCredentials,
  oauthCallback,
} from '../controllers/integrations.controller';
import { requireInternalAuth, authenticateRunCaller } from '../middleware/auth';
import { internalRecordUsage } from '../controllers/marketplace-usage.controller';

export const router: RouterType = Router();

router.use(healthRouter);
router.use('/v1/auth', authRouter);
router.use('/v1/users', usersRouter);
router.use('/v1/tenants', tenantsRouter);
router.use('/v1/keys', apiKeysRouter);
// Public webhook receiver — the calling service carries no bearer token; the
// per-agent HMAC secret in the URL authenticates it. Must precede agentsRouter,
// which applies requireAuth to the whole /v1/agents prefix (a router-level
// use() runs even when no route in it matches, so a later mount is unreachable).
router.post('/v1/agents/:id/webhook/:secret', handleWebhook);
// Run routes — same precedence requirement. They admit invocation-plane callers
// (an agent-scoped `ik_` key, an external JWT, or nothing for a `public` agent)
// which agentsRouter's requireAuth would reject out of hand.
router.use('/v1/agents/:id/runs', runsRouter);
router.use('/v1/agents', agentsRouter);
router.use('/v1/llm', llmRouter);
// Public OAuth callback — the provider redirects the user's browser here with no
// bearer token; the single-use state token + nonce cookie authenticate it. Must
// precede integrationsRouter, which applies requireAuth to the whole prefix.
router.get('/v1/integrations/oauth/:service/callback', oauthCallback);
router.use('/v1/integrations', integrationsRouter);
router.use('/v1/telemetry', telemetryRouter);
router.use('/v1/datasources', datasourcesRouter);
router.use('/v1/mcp-servers', mcpServersRouter);
router.use('/v1/utils', utilsRouter);
router.use('/v1/prompts', promptsRouter);
router.use('/v1/caal', caalRouter);
router.use('/v1/marketplace', marketplaceRouter);
// Direct run lookup (SDK client.runs.get) — platform or invocation plane
router.get('/v1/runs/:runId', authenticateRunCaller, getRunDirect);
// OpenAPI document — public, the source for the published API reference
router.get('/v1/openapi.json', (_req, res) => {
  res.json(buildOpenApiSpec());
});
// Tenant-wide session list (ALIGN-025) — the admin panel's data source
router.use('/v1/sessions', tenantSessionsRouter);
// Internal engine→API session endpoints
router.use('/internal/sessions', internalSessionRouter);
// Internal engine→API credential refresh persistence
router.post(
  '/internal/integrations/connections/:id/credentials',
  requireInternalAuth,
  internalUpdateCredentials,
);
// Internal engine→API per-package usage flush (ALIGN-019)
router.post('/internal/marketplace/usage', requireInternalAuth, internalRecordUsage);
// Public integration trigger receiver — no auth middleware; authenticity is
// established by the service's webhook signature, verified in the engine
router.post('/v1/triggers/integrations/:service/:tenantSlug', receiveIntegrationEvent);
router.use('/v1', systemRouter);
