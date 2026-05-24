import request from 'supertest';
import type { Express } from 'express';
import * as crypto from 'node:crypto';
import { db } from '@/db/client';
import { tenants, users } from '@/db/schema';
import { hashPassword } from '@/lib/password';

const TEST_PASSWORD = 'Test1234!';

export interface TestAuth {
  token: string;
  userId: string;
  tenantId: string;
}

export async function createUserAndLogin(
  app: Express,
  role: 'platform_admin' | 'tenant_admin' | 'developer' | 'viewer' = 'developer',
): Promise<TestAuth> {
  const tenantId = crypto.randomUUID();
  const userId = crypto.randomUUID();
  const email = `test+${userId.slice(0, 8)}@example.com`;
  const now = new Date();

  await db.insert(tenants).values({
    id: tenantId,
    name: 'Test Tenant',
    slug: `slug-${tenantId.slice(0, 8)}`,
    enabled: true,
    createdAt: now,
    updatedAt: now,
  });

  await db.insert(users).values({
    id: userId,
    tenantId,
    name: 'Test User',
    email,
    passwordHash: await hashPassword(TEST_PASSWORD),
    role,
    active: true,
    createdAt: now,
    updatedAt: now,
  });

  const res = await request(app)
    .post('/v1/auth/login')
    .send({ email, password: TEST_PASSWORD });

  return {
    token: res.body.accessToken as string,
    userId,
    tenantId,
  };
}
