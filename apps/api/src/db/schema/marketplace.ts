import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { tenants } from './auth';

export const packageRegistry = sqliteTable('package_registry', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  name: text('name').notNull(),
  version: text('version').notNull(),
  publisher: text('publisher').notNull(),
  packageType: text('package_type', {
    enum: ['nodes', 'integration', 'template', 'prompt-pack'],
  }).notNull(),
  manifestJson: text('manifest_json').notNull(),
  installedAt: integer('installed_at', { mode: 'timestamp' }).notNull(),
  enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
  publisherSig: text('publisher_sig'),
  contentHash: text('content_hash'),
  magicaalCountersig: text('magicaal_countersig'),
  signatureStatus: text('signature_status', {
    enum: ['verified', 'unverified', 'invalid'],
  })
    .notNull()
    .default('unverified'),
});

export const marketplaceCatalogCache = sqliteTable('marketplace_catalog_cache', {
  id: text('id').primaryKey(),
  fetchedAt: integer('fetched_at', { mode: 'timestamp' }).notNull(),
  catalogJson: text('catalog_json').notNull(),
});

export const marketplaceAccount = sqliteTable('marketplace_account', {
  id: text('id').primaryKey(),
  apiKeyEnc: text('api_key_enc').notNull(),
  linkedAt: integer('linked_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const assetLicenses = sqliteTable('asset_licenses', {
  id: text('id').primaryKey(),
  packageId: text('package_id')
    .notNull()
    .references(() => packageRegistry.id),
  licenseType: text('license_type', { enum: ['free', 'paid', 'trial'] }).notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
  lastValidatedAt: integer('last_validated_at', { mode: 'timestamp' }),
  gracePeriodEndsAt: integer('grace_period_ends_at', { mode: 'timestamp' }),
  status: text('status', { enum: ['active', 'grace', 'expired'] })
    .notNull()
    .default('active'),
});
