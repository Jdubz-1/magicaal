import request from 'supertest';
import { eq } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { integrationConnections } from '@/db/schema';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

const app = createApp();

beforeAll(async () => {
  await runMigrations();
});

describe('POST /internal/integrations/connections/:id/credentials', () => {
  it('re-encrypts refreshed credentials and updates expiry', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');

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
    const connectionId = created.body.id as string;

    const expiresAt = Date.now() + 3_600_000;
    const res = await request(app)
      .post(`/internal/integrations/connections/${connectionId}/credentials`)
      .send({ credentials: { access_token: 'new', refresh_token: 'r2' }, expiresAt });

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

  it('404s for an unknown connection', async () => {
    const res = await request(app)
      .post('/internal/integrations/connections/nope/credentials')
      .send({ credentials: { access_token: 'x' } });
    expect(res.status).toBe(404);
  });
});
