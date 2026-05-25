import { Router, type Router as RouterType } from 'express';
import {
  dispatchRun,
  getRun,
  getRunSteps,
  cancelRun,
  deployAgent,
} from '../controllers/runs.controller';
import { listNodes } from '../controllers/nodes.controller';

export const internalRouter: RouterType = Router();

internalRouter.post('/runs', dispatchRun);
internalRouter.get('/runs/:id', getRun);
internalRouter.get('/runs/:id/steps', getRunSteps);
internalRouter.delete('/runs/:id', cancelRun);

internalRouter.post('/agents/:id/deploy', deployAgent);

internalRouter.get('/nodes', listNodes);
