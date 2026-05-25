import { Router, type Router as RouterType } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';
import { listUsers, createUser, getUser, updateUser, deactivateUser } from '../controllers/users.controller';

export const usersRouter: RouterType = Router();

usersRouter.use(requireAuth);

usersRouter.get('/', listUsers);
usersRouter.post('/', requireRole('platform_admin', 'tenant_admin'), createUser);
usersRouter.get('/:id', getUser);
usersRouter.patch('/:id', requireRole('platform_admin', 'tenant_admin'), updateUser);
usersRouter.delete('/:id', requireRole('platform_admin', 'tenant_admin'), deactivateUser);
