import * as crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { tenants, caalConfiguration } from '../db/schema';
import { logger } from '../lib/logger';

export const PLATFORM_TENANT_ID = '_platform';

export async function ensurePlatformTenant(): Promise<void> {
  const existing = await db.select({ id: tenants.id }).from(tenants).where(eq(tenants.id, PLATFORM_TENANT_ID));

  if (existing.length === 0) {
    await db.insert(tenants).values({
      id: PLATFORM_TENANT_ID,
      name: 'MagiCaal Platform',
      slug: '_platform',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    logger.info('Created _platform tenant');
  }

  // Ensure default caal_configuration row exists for the platform tenant
  const existingCaalConfig = await db
    .select({ id: caalConfiguration.id })
    .from(caalConfiguration)
    .where(eq(caalConfiguration.tenantId, PLATFORM_TENANT_ID));

  if (existingCaalConfig.length === 0) {
    const now = new Date();
    await db.insert(caalConfiguration).values({
      id: crypto.randomUUID(),
      tenantId: PLATFORM_TENANT_ID,
      enabled: true,
      generationMode: 'complete',
      confirmationMode: 'confirm_structural',
      showReasoning: false,
      createdAt: now,
      updatedAt: now,
    });
    logger.info('Created default Caal configuration for _platform tenant');
  }
}
