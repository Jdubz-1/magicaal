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
  deleteAgent,
} from '../controllers/agents.controller';
import { createInvocationKey, listInvocationKeys, revokeInvocationKey } from '../controllers/invocation-keys.controller';
import { getInvocationPolicy, updateInvocationPolicy } from '../controllers/invocation-policy.controller';
import { getInvocationLog } from '../controllers/invocation-log.controller';
import { sessionRouter } from './sessions';
import { testCasesRouter } from './test-cases';

export const agentsRouter: RouterType = Router();

agentsRouter.use(requireAuth);
agentsRouter.use(requireMinRole('developer'));

agentsRouter.get('/', listAgents);
agentsRouter.post('/', createAgent);
agentsRouter.get('/:id', getAgent);
agentsRouter.patch('/:id', updateAgent);
// Archives by default; ?purge=true hard-deletes and is gated on tenant_admin
// inside the handler, since the stricter role depends on the query param.
agentsRouter.delete('/:id', deleteAgent);
agentsRouter.post('/:id/publish', publishAgent);
agentsRouter.post('/:id/draft', draftAgent);
agentsRouter.get('/:id/versions', listAgentVersions);
agentsRouter.get('/:id/versions/:vId/diff', getVersionDiff);
agentsRouter.post('/:id/versions/:vId/rollback', rollbackVersion);
agentsRouter.get('/:id/config', getAgentConfig);
agentsRouter.patch('/:id/config', updateAgentConfig);
agentsRouter.get('/:id/schema/input', getSchemaInput);
agentsRouter.get('/:id/schema/output', getSchemaOutput);

// Run routes live in routes/runs.ts, mounted ahead of this router: they admit
// invocation-plane callers too, which this router's requireAuth would reject.

agentsRouter.get('/:id/invocation-policy', getInvocationPolicy);
agentsRouter.patch('/:id/invocation-policy', updateInvocationPolicy);
agentsRouter.post('/:id/invocation-keys', createInvocationKey);
agentsRouter.get('/:id/invocation-keys', listInvocationKeys);
agentsRouter.delete('/:id/invocation-keys/:keyId', revokeInvocationKey);
agentsRouter.get('/:id/invocation-log', getInvocationLog);

// Phase 4 sub-routers
agentsRouter.use('/:id/sessions', sessionRouter);
agentsRouter.use('/:id/test-cases', testCasesRouter);
