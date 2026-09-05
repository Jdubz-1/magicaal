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
  listAgentRuns,
} from '../controllers/runs.controller';
import { scheduleCronAgent, unscheduleCronAgent } from '../controllers/schedule.controller';
import { teardownAgent } from '../controllers/agent-teardown.controller';
import {
  getTelemetry,
  getTokenUsage,
  getRunDetail,
  getTrajectory,
  getRoutingEvents,
  getEvaluateScores,
  getUsageAggregate,
} from '../controllers/telemetry.controller';
import { listNodes } from '../controllers/nodes.controller';
import { testMcpServerInternal } from '../controllers/mcp-servers.controller';
import {
  listIntegrations,
  integrationTriggerDispatch,
} from '../controllers/integrations.controller';
import { installPackage } from '../controllers/packages.controller';
import { validateInvocation } from '../controllers/invocation-auth.controller';
import { summarizeItems, getProviderHealth } from '../controllers/llm.controller';

export const internalRouter: RouterType = Router();

// Invocation-plane authority: the API defers here for callers that present no
// platform credential, so the agent's invocation policy has one implementation.
internalRouter.post('/invocation-auth/validate', validateInvocation);

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
// Archive/purge teardown: active-run check, cron removal, cache invalidation,
// and (on purge) the agent's telemetry history.
internalRouter.delete('/agents/:id', teardownAgent);
internalRouter.post('/agents/:agentId/webhook', webhookDispatch);
internalRouter.get('/agents/:id/runs', listAgentRuns);

internalRouter.get('/telemetry', getTelemetry);
internalRouter.get('/telemetry/tokens', getTokenUsage);
internalRouter.get('/telemetry/runs/:runId', getRunDetail);
internalRouter.get('/telemetry/trajectory/:runId', getTrajectory);
internalRouter.get('/telemetry/routing-events', getRoutingEvents);
internalRouter.get('/telemetry/evaluate-scores', getEvaluateScores);
internalRouter.get('/telemetry/usage', getUsageAggregate);

internalRouter.post('/mcp-servers/test', testMcpServerInternal);

internalRouter.get('/nodes', listNodes);

internalRouter.get('/integrations', listIntegrations);
internalRouter.post('/triggers/integrations/:service', integrationTriggerDispatch);

internalRouter.post('/packages/install', installPackage);

// Session-overflow summarization for the API's Session Manager (ALIGN-007)
internalRouter.post('/llm/summarize', summarizeItems);
internalRouter.get('/llm/provider-health', getProviderHealth);
