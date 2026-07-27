import request from 'supertest';
import * as crypto from 'node:crypto';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { ensurePlatformTenant, PLATFORM_TENANT_ID } from '../../src/platform/bootstrap';
import { db } from '@/db/client';
import { agents } from '@/db/schema';

// A short poll ceiling so the still-running path (ISS-068) is reachable
// without a slow test — the real default is 120000ms.
jest.mock('@/config', () => {
  const actual = jest.requireActual('@/config');
  return {
    ...actual,
    config: {
      ...actual.config,
      caalInvokeTimeoutMs: 700,
    },
  };
});

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { engineClient } = require('../../src/lib/engine-client') as {
  engineClient: { post: jest.Mock; get: jest.Mock };
};

const app = createApp();

beforeAll(async () => {
  await runMigrations();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Caal invocation still-running path (ISS-068)', () => {
  it('returns 202 CAAL_STILL_RUNNING instead of a bare timeout when the run outlasts the poll ceiling', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    await ensurePlatformTenant();
    await db.insert(agents).values({
      id: crypto.randomUUID(),
      tenantId: PLATFORM_TENANT_ID,
      name: 'Caal',
      handle: 'caal-assistant',
      status: 'active',
      authoringMode: 'code-defined',
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    engineClient.post.mockResolvedValue({ data: { runId: 'caal-slow-run' } });
    // Never terminal — the run just keeps "running" past the poll ceiling.
    engineClient.get.mockResolvedValue({ data: { status: 'running' } });

    const res = await request(app)
      .post('/v1/caal/invoke')
      .set('Authorization', `Bearer ${token}`)
      .send({ message: 'do something slow', agentId: 'agent-slow' });

    expect(res.status).toBe(202);
    expect(res.body.code).toBe('CAAL_STILL_RUNNING');
    expect(res.body.runId).toBe('caal-slow-run');
    expect(res.body.sessionId).toBeDefined();
  }, 20_000);
});
