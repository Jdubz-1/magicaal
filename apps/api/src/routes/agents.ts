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
  getAgentConfig,
  updateAgentConfig,
} from '../controllers/agents.controller';
import { dispatchRun, getRun, getRunSteps } from '../controllers/runs.controller';
import { createInvocationKey, listInvocationKeys, revokeInvocationKey } from '../controllers/invocation-keys.controller';

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
agentsRouter.get('/:id/config', getAgentConfig);
agentsRouter.patch('/:id/config', updateAgentConfig);

agentsRouter.post('/:id/runs', dispatchRun);
agentsRouter.get('/:id/runs/:runId', getRun);
agentsRouter.get('/:id/runs/:runId/steps', getRunSteps);

agentsRouter.post('/:id/invocation-keys', createInvocationKey);
agentsRouter.get('/:id/invocation-keys', listInvocationKeys);
agentsRouter.delete('/:id/invocation-keys/:keyId', revokeInvocationKey);
