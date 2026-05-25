import { Router, type Router as RouterType } from 'express';
import { healthController } from '../controllers/health.controller';

export const healthRouter: RouterType = Router();

healthRouter.get('/health', healthController);
