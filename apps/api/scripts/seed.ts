import { createHash, randomUUID } from 'crypto';
import { db } from '../src/db/client';
import { tenants, users, apiKeys } from '../src/db/schema';
import { hashPassword } from '../src/lib/password';

if (process.env.NODE_ENV === 'production') {
  console.error('seed.ts must not be run in production');
  process.exit(1);
}

async function seed(): Promise<void> {
  const now = new Date();

  const tenantId = randomUUID();
  await db.insert(tenants).values({
    id: tenantId,
    name: 'Dev Tenant',
    slug: 'dev',
    resourceLimits: '{}',
    enabled: true,
    createdAt: now,
    updatedAt: now,
  }).onConflictDoNothing();

  const userId = randomUUID();
  const passwordHash = await hashPassword('admin');
  await db.insert(users).values({
    id: userId,
    tenantId,
    email: 'admin@dev.local',
    passwordHash,
    role: 'platform_admin',
    active: true,
    createdAt: now,
    updatedAt: now,
  }).onConflictDoNothing();

  const keyPlain = 'dev-api-key-00000000';
  const keyHash = createHash('sha256').update(keyPlain).digest('hex');
  await db.insert(apiKeys).values({
    id: randomUUID(),
    tenantId,
    userId,
    name: 'Default Dev Key',
    keyHash,
    revoked: false,
    createdAt: now,
  }).onConflictDoNothing();

  console.log('Seed complete');
  console.log('  Tenant:', tenantId, '(slug: dev)');
  console.log('  User:   admin@dev.local / admin');
  console.log('  API Key:', keyPlain);
}

seed().catch((err) => {
  console.error('Seed failed', err);
  process.exit(1);
});
