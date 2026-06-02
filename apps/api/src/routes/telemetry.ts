import { Router, type Router as RouterType } from 'express';
import { requireAuth, requireMinRole } from '../middleware/auth';
import { getTelemetry, getTokenUsage } from '../controllers/telemetry.controller';

export const telemetryRouter: RouterType = Router();

telemetryRouter.use(requireAuth);
telemetryRouter.use(requireMinRole('developer'));

telemetryRouter.get('/', getTelemetry);
telemetryRouter.get('/tokens', getTokenUsage);
