import { Router, type Router as RouterType } from 'express';
import { requireAuth, requireMinRole } from '../middleware/auth';
import {
  listPrompts,
  createPromptVersion,
  getPromptVersions,
  promotePromptVersion,
  diffPromptVersions,
} from '../controllers/prompts.controller';

export const promptsRouter: RouterType = Router();

promptsRouter.get('/', requireAuth, listPrompts);
promptsRouter.post('/', requireAuth, requireMinRole('developer'), createPromptVersion);
promptsRouter.get('/:name/versions', requireAuth, getPromptVersions);
promptsRouter.get('/:name/versions/:vid/diff', requireAuth, diffPromptVersions);
promptsRouter.post('/:name/versions/:vid/promote', requireAuth, requireMinRole('developer'), promotePromptVersion);
