import request from 'supertest';
import Database from 'better-sqlite3';
import type { Application } from 'express';
import { buildTestApp, internalAuthHeader, dbFile } from '../helpers/app';
import { seedAgent, seedInvocationKey, seedInvocationPolicy } from '../helpers/primary-db';

describe('POST /internal/invocation-auth/validate', () => {
  let app: Application;
  let db: Database.Database;

  beforeAll(async () => {
    app = await buildTestApp();
    db = new Database(dbFile);
  });

  afterAll(() => {
    db.close();
  });

  // The API calls this exact shape from middleware/auth.ts's
  // authenticateAgentCaller — { agentId, authorizationHeader }.
  function validate(body: Record<string, unknown>) {
    return request(app)
      .post('/internal/invocation-auth/validate')
      .set(internalAuthHeader())
      .send(body);
  }

  describe('api-key strategy (default policy)', () => {
    it('accepts a valid key and resolves the agent and tenant', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-a' });
      const { rawKey, id: keyId } = seedInvocationKey(db, { agentId, tenantId: 'tenant-a' });

      const res = await validate({ agentId, authorizationHeader: `Bearer ${rawKey}` });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ keyId, agentId, tenantId: 'tenant-a', strategy: 'api-key' });
    });

    it('rejects a key issued for a different agent with 401 INVALID_KEY', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-a' });
      const otherAgentId = seedAgent(db, { tenantId: 'tenant-a' });
      const { rawKey } = seedInvocationKey(db, { agentId: otherAgentId, tenantId: 'tenant-a' });

      const res = await validate({ agentId, authorizationHeader: `Bearer ${rawKey}` });

      expect(res.status).toBe(401);
      expect(res.body.code).toBe('INVALID_KEY');
    });

    it('rejects a revoked key', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-a' });
      const { rawKey } = seedInvocationKey(db, { agentId, tenantId: 'tenant-a', revoked: true });

      const res = await validate({ agentId, authorizationHeader: `Bearer ${rawKey}` });

      expect(res.status).toBe(401);
      expect(res.body.code).toBe('INVALID_KEY');
    });

    it('rejects an expired key with KEY_EXPIRED', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-a' });
      const { rawKey } = seedInvocationKey(db, {
        agentId,
        tenantId: 'tenant-a',
        expiresAt: Math.floor(Date.now() / 1000) - 60,
      });

      const res = await validate({ agentId, authorizationHeader: `Bearer ${rawKey}` });

      expect(res.status).toBe(401);
      expect(res.body.code).toBe('KEY_EXPIRED');
    });

    it('rejects a missing Authorization header with MISSING_AUTH', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-a' });

      const res = await validate({ agentId });

      expect(res.status).toBe(401);
      expect(res.body.code).toBe('MISSING_AUTH');
    });

    it('400s when agentId is missing from the request', async () => {
      const res = await validate({ authorizationHeader: 'Bearer whatever' });
      expect(res.status).toBe(400);
    });
  });

  describe('public strategy', () => {
    it('authenticates with no credential at all', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-b' });
      seedInvocationPolicy(db, agentId, 'public');

      const res = await validate({ agentId });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ keyId: 'public', agentId, tenantId: 'tenant-b', strategy: 'public' });
    });

    it('404s for a disabled agent', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-b', enabled: false });
      seedInvocationPolicy(db, agentId, 'public');

      const res = await validate({ agentId });

      expect(res.status).toBe(404);
      expect(res.body.code).toBe('AGENT_NOT_FOUND');
    });
  });

  describe('jwt strategy', () => {
    it('500s when the strategy is set but no jwtConfig was stored', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-c' });
      seedInvocationPolicy(db, agentId, 'jwt');

      const res = await validate({ agentId, authorizationHeader: 'Bearer some.jwt.token' });

      expect(res.status).toBe(500);
      expect(res.body.code).toBe('JWT_CONFIG_MISSING');
    });

    it('rejects a malformed token before reaching the IdP', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-c' });
      seedInvocationPolicy(db, agentId, 'jwt', { jwksUrl: 'https://idp.example.com/.well-known/jwks.json' });

      const res = await validate({ agentId, authorizationHeader: 'Bearer not-a-jwt' });

      expect(res.status).toBe(401);
    });
  });

  it('401s the whole route without X-Internal-Auth — this is an /internal route like any other', async () => {
    const res = await request(app)
      .post('/internal/invocation-auth/validate')
      .send({ agentId: 'whatever' });
    expect(res.status).toBe(401);
  });
});
