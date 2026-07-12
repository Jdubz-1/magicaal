import request from 'supertest';
import { eq } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { integrationConnections } from '@/db/schema';
import { config } from '@/config';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

const app = createApp();
const INTERNAL_AUTH = config.masterKey;

beforeAll(async () => {
  await runMigrations();
});

async function createConnection(token: string): Promise<string> {
  const created = await request(app)
    .post('/v1/integrations/connections')
    .set('Authorization', `Bearer ${token}`)
    .send({
      service: 'slack',
      displayName: 'Team Slack',
      authType: 'oauth2',
      credentials: { access_token: 'old', refresh_token: 'r1' },
    });
  expect(created.status).toBe(201);
  return created.body.id as string;
}

describe('POST /internal/integrations/connections/:id/credentials', () => {
  it('re-encrypts refreshed credentials and updates expiry', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');
    const connectionId = await createConnection(token);

    const expiresAt = Date.now() + 3_600_000;
    const res = await request(app)
      .post(`/internal/integrations/connections/${connectionId}/credentials`)
      .set('X-Internal-Auth', INTERNAL_AUTH)
      .send({
        credentials: { access_token: 'new', refresh_token: 'r2' },
        expiresAt,
        tenantId,
      });

    expect(res.status).toBe(200);
    expect(res.body.updated).toBe(true);

    const rows = await db
      .select()
      .from(integrationConnections)
      .where(eq(integrationConnections.id, connectionId));
    expect(rows[0].tenantId).toBe(tenantId);
    expect(rows[0].status).toBe('active');
    expect(rows[0].expiresAt).not.toBeNull();
    // Ciphertext changed — old token no longer stored as-is
    expect(rows[0].credentialsEnc).not.toContain('old');
  });

  it('401s without the internal auth header', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');
    const connectionId = await createConnection(token);

    const res = await request(app)
      .post(`/internal/integrations/connections/${connectionId}/credentials`)
      .send({ credentials: { access_token: 'pwned' }, tenantId });

    expect(res.status).toBe(401);
  });

  it('401s with a wrong internal auth header', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');
    const connectionId = await createConnection(token);

    const res = await request(app)
      .post(`/internal/integrations/connections/${connectionId}/credentials`)
      .set('X-Internal-Auth', 'not-the-master-key')
      .send({ credentials: { access_token: 'pwned' }, tenantId });

    expect(res.status).toBe(401);
  });

  it('404s when the connection belongs to another tenant', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const connectionId = await createConnection(token);
    const other = await createUserAndLogin(app, 'tenant_admin');

    const res = await request(app)
      .post(`/internal/integrations/connections/${connectionId}/credentials`)
      .set('X-Internal-Auth', INTERNAL_AUTH)
      .send({ credentials: { access_token: 'x' }, tenantId: other.tenantId });

    expect(res.status).toBe(404);
  });

  it('400s without a tenantId', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const connectionId = await createConnection(token);

    const res = await request(app)
      .post(`/internal/integrations/connections/${connectionId}/credentials`)
      .set('X-Internal-Auth', INTERNAL_AUTH)
      .send({ credentials: { access_token: 'x' } });

    expect(res.status).toBe(400);
  });

  it('404s for an unknown connection', async () => {
    const { tenantId } = await createUserAndLogin(app, 'tenant_admin');

    const res = await request(app)
      .post('/internal/integrations/connections/nope/credentials')
      .set('X-Internal-Auth', INTERNAL_AUTH)
      .send({ credentials: { access_token: 'x' }, tenantId });

    expect(res.status).toBe(404);
  });
});
