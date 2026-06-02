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
import { handleWebhook } from '../controllers/webhook.controller';

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
// Public webhook endpoint — no auth middleware; secret is in URL
router.post('/v1/agents/:id/webhook/:secret', handleWebhook);
router.use('/v1', systemRouter);
