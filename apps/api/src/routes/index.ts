import { Router } from 'express';
import { healthRouter } from './health';
import { authRouter } from './auth';
import { usersRouter } from './users';
import { tenantsRouter } from './tenants';
import { agentsRouter } from './agents';
import { systemRouter } from './system';

export const router = Router();

router.use(healthRouter);
router.use('/v1/auth', authRouter);
router.use('/v1/users', usersRouter);
router.use('/v1/tenants', tenantsRouter);
router.use('/v1/agents', agentsRouter);
router.use('/v1', systemRouter);
