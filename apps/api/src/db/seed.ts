import { createHash, randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { config } from '../config';
import { hashPassword } from '../lib/password';
import { logger } from '../lib/logger';
import { db } from './client';
import { tenants, users, apiKeys } from './schema/auth';

export async function runSeedIfEmpty(): Promise<void> {
  if (!config.seedOnBoot) return;

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.role, 'platform_admin'))
    .limit(1);

  if (existing.length > 0) {
    logger.info('Seed skipped (platform_admin already exists)');
    return;
  }

  const now = new Date();
  const tenantId = randomUUID();
  const userId = randomUUID();
  const keyPlain = 'dev-api-key-00000000';

  await db.insert(tenants).values({
    id: tenantId,
    name: 'Dev Tenant',
    slug: 'dev',
    resourceLimits: '{}',
    enabled: true,
    createdAt: now,
    updatedAt: now,
  }).onConflictDoNothing();

  await db.insert(users).values({
    id: userId,
    tenantId,
    email: 'admin@dev.local',
    passwordHash: await hashPassword('admin'),
    role: 'platform_admin',
    active: true,
    createdAt: now,
    updatedAt: now,
  }).onConflictDoNothing();

  await db.insert(apiKeys).values({
    id: randomUUID(),
    tenantId,
    userId,
    name: 'Default Dev Key',
    keyHash: createHash('sha256').update(keyPlain).digest('hex'),
    revoked: false,
    createdAt: now,
  }).onConflictDoNothing();

  logger.info(
    { email: 'admin@dev.local', password: 'admin', apiKey: keyPlain },
    'Dev seed complete',
  );
}
