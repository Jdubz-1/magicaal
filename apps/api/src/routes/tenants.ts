import { Router, type Router as RouterType } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';
import { listTenants, createTenant, getTenant, updateTenant } from '../controllers/tenants.controller';

export const tenantsRouter: RouterType = Router();

tenantsRouter.use(requireAuth);

tenantsRouter.get('/', requireRole('platform_admin'), listTenants);
tenantsRouter.post('/', requireRole('platform_admin'), createTenant);
tenantsRouter.get('/:id', requireRole('platform_admin', 'tenant_admin'), getTenant);
tenantsRouter.patch('/:id', requireRole('platform_admin', 'tenant_admin'), updateTenant);
