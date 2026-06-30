import { Router, type Router as RouterType } from 'express';
import { requireAuth, requireMinRole } from '../middleware/auth';
import {
  listAgents,
  createAgent,
  getAgent,
  updateAgent,
  publishAgent,
  draftAgent,
  listAgentVersions,
  getVersionDiff,
  rollbackVersion,
  getAgentConfig,
  updateAgentConfig,
  getSchemaInput,
  getSchemaOutput,
} from '../controllers/agents.controller';
import { dispatchRun, getRun, getRunSteps, streamRun, reviewRun } from '../controllers/runs.controller';
import { createInvocationKey, listInvocationKeys, revokeInvocationKey } from '../controllers/invocation-keys.controller';
import { getInvocationPolicy, updateInvocationPolicy } from '../controllers/invocation-policy.controller';
import { sessionRouter } from './sessions';
import { testCasesRouter } from './test-cases';

export const agentsRouter: RouterType = Router();

agentsRouter.use(requireAuth);
agentsRouter.use(requireMinRole('developer'));

agentsRouter.get('/', listAgents);
agentsRouter.post('/', createAgent);
agentsRouter.get('/:id', getAgent);
agentsRouter.patch('/:id', updateAgent);
agentsRouter.post('/:id/publish', publishAgent);
agentsRouter.post('/:id/draft', draftAgent);
agentsRouter.get('/:id/versions', listAgentVersions);
agentsRouter.get('/:id/versions/:vId/diff', getVersionDiff);
agentsRouter.post('/:id/versions/:vId/rollback', rollbackVersion);
agentsRouter.get('/:id/config', getAgentConfig);
agentsRouter.patch('/:id/config', updateAgentConfig);
agentsRouter.get('/:id/schema/input', getSchemaInput);
agentsRouter.get('/:id/schema/output', getSchemaOutput);

agentsRouter.post('/:id/runs', dispatchRun);
agentsRouter.get('/:id/runs/:runId', getRun);
agentsRouter.get('/:id/runs/:runId/steps', getRunSteps);
agentsRouter.get('/:id/runs/:runId/stream', streamRun);
agentsRouter.post('/:id/runs/:runId/review', reviewRun);

agentsRouter.get('/:id/invocation-policy', getInvocationPolicy);
agentsRouter.patch('/:id/invocation-policy', updateInvocationPolicy);
agentsRouter.post('/:id/invocation-keys', createInvocationKey);
agentsRouter.get('/:id/invocation-keys', listInvocationKeys);
agentsRouter.delete('/:id/invocation-keys/:keyId', revokeInvocationKey);

// Phase 4 sub-routers
agentsRouter.use('/:id/sessions', sessionRouter);
agentsRouter.use('/:id/test-cases', testCasesRouter);
