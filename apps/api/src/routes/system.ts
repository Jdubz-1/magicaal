import { Router, type Router as RouterType } from 'express';
import { requireAuth } from '../middleware/auth';
import { getSystemHealth, listNodes } from '../controllers/system.controller';

export const systemRouter: RouterType = Router();

systemRouter.get('/system', requireAuth, getSystemHealth);
systemRouter.get('/nodes', requireAuth, listNodes);
