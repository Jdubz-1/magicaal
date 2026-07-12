import { Router } from 'express';
import { healthRouter } from './health';
import { internalRouter } from './internal';
import { requireInternalAuth } from '../middleware/internalAuth';

export const router: Router = Router();

// /health stays unauthenticated — the container healthcheck depends on it
router.use(healthRouter);
router.use('/internal', requireInternalAuth, internalRouter);
