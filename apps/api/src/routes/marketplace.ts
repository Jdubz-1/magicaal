import { Router, type Router as RouterType } from 'express';
import { requireAuth, requireMinRole } from '../middleware/auth';
import { requireMarketplaceEnabled } from '../middleware/marketplace-gate';
import {
  linkAccount,
  getAccount,
  getCatalog,
  listPackages,
  installFromCatalog,
  updatePackage,
  removePackage,
  listLicenses,
  uploadLicenseBundle,
  importTemplate,
  importPromptPack,
} from '../controllers/marketplace.controller';

export const marketplaceRouter: RouterType = Router();

marketplaceRouter.use(requireAuth);

// Air-gapped bundle upload — ALWAYS active, regardless of MARKETPLACE_ENABLED
marketplaceRouter.post(
  '/licenses/bundle',
  requireMinRole('tenant_admin'),
  uploadLicenseBundle,
);

// Everything below requires Marketplace connectivity (503 when disabled)
marketplaceRouter.use(requireMarketplaceEnabled);

marketplaceRouter.post('/account', requireMinRole('tenant_admin'), linkAccount);
marketplaceRouter.get('/account', getAccount);
marketplaceRouter.get('/catalog', getCatalog);
marketplaceRouter.get('/packages', listPackages);
marketplaceRouter.post('/packages/:id/install', requireMinRole('tenant_admin'), installFromCatalog);
marketplaceRouter.post('/packages/:id/update', requireMinRole('tenant_admin'), updatePackage);
marketplaceRouter.delete('/packages/:id', requireMinRole('tenant_admin'), removePackage);
marketplaceRouter.get('/licenses', listLicenses);
marketplaceRouter.post('/templates/import', requireMinRole('tenant_admin'), importTemplate);
marketplaceRouter.post('/prompt-packs/import', requireMinRole('tenant_admin'), importPromptPack);
