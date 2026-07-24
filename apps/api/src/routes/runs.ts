import { Router, type Router as RouterType } from 'express';
import { authenticateAgentCaller } from '../middleware/auth';
import {
  dispatchRun,
  getRun,
  getRunSteps,
  streamRun,
  reviewRun,
  cancelRun,
  listRuns,
} from '../controllers/runs.controller';

/**
 * Agent-scoped run routes, mounted at /v1/agents/:id/runs.
 *
 * These live outside agentsRouter because they serve a second class of caller.
 * agentsRouter applies requireAuth + requireMinRole('developer') at router
 * level, which only admits platform principals — but a run may also be invoked
 * by a third party holding an invocation credential for this one agent, and by
 * an anonymous caller when the agent's policy is `public`.
 * authenticateAgentCaller resolves whichever plane applies.
 */
export const runsRouter: RouterType = Router({ mergeParams: true });

runsRouter.use(authenticateAgentCaller);

runsRouter.post('/', dispatchRun);
runsRouter.get('/', listRuns);
runsRouter.get('/:runId', getRun);
runsRouter.get('/:runId/steps', getRunSteps);
runsRouter.get('/:runId/stream', streamRun);
runsRouter.post('/:runId/review', reviewRun);
runsRouter.delete('/:runId', cancelRun);
