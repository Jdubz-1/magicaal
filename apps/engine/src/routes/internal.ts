import { Router, type Router as RouterType } from 'express';
import {
  dispatchRun,
  getRun,
  getRunSteps,
  streamRun,
  reviewRun,
  cancelRun,
  deployAgent,
  webhookDispatch,
} from '../controllers/runs.controller';
import { scheduleCronAgent, unscheduleCronAgent } from '../controllers/schedule.controller';
import { getTelemetry, getTokenUsage, getRunDetail, getTrajectory, getRoutingEvents } from '../controllers/telemetry.controller';
import { listNodes } from '../controllers/nodes.controller';
import { testMcpServerInternal } from '../controllers/mcp-servers.controller';
import {
  listIntegrations,
  integrationTriggerDispatch,
} from '../controllers/integrations.controller';

export const internalRouter: RouterType = Router();

internalRouter.post('/runs', dispatchRun);
internalRouter.get('/runs/:id', getRun);
internalRouter.get('/runs/:id/steps', getRunSteps);
internalRouter.get('/runs/:id/stream', streamRun);
internalRouter.post('/runs/:id/review', reviewRun);
internalRouter.delete('/runs/:id', cancelRun);

// /schedule must come before /:id routes to avoid Express param conflict
internalRouter.post('/agents/schedule', scheduleCronAgent);
internalRouter.delete('/agents/:agentId/schedule', unscheduleCronAgent);
internalRouter.post('/agents/:id/deploy', deployAgent);
internalRouter.post('/agents/:agentId/webhook', webhookDispatch);

internalRouter.get('/telemetry', getTelemetry);
internalRouter.get('/telemetry/tokens', getTokenUsage);
internalRouter.get('/telemetry/runs/:runId', getRunDetail);
internalRouter.get('/telemetry/trajectory/:runId', getTrajectory);
internalRouter.get('/telemetry/routing-events', getRoutingEvents);

internalRouter.post('/mcp-servers/test', testMcpServerInternal);

internalRouter.get('/nodes', listNodes);

internalRouter.get('/integrations', listIntegrations);
internalRouter.post('/triggers/integrations/:service', integrationTriggerDispatch);
