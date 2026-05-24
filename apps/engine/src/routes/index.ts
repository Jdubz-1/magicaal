import { Router } from 'express';
import { healthRouter } from './health';
import { internalRouter } from './internal';

export const router = Router();

router.use(healthRouter);
router.use('/internal', internalRouter);
