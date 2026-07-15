import request from 'supertest';
import type { Application } from 'express';
import { buildTestApp, internalAuthHeader } from '../helpers/app';
import { config } from '@/config';

describe('/internal/* — requireInternalAuth gate', () => {
  let app: Application;

  beforeAll(async () => {
    app = await buildTestApp();
  });

  // A representative slice of the surface, not an exhaustive route list —
  // the gate is router-level middleware (routes/index.ts), so any one route
  // proves the others behind it are covered the same way.
  const probes: Array<[string, string]> = [
    ['get', '/internal/nodes'],
    ['get', '/internal/integrations'],
    ['post', '/internal/runs'],
    ['get', '/internal/telemetry?tenantId=t-1'],
  ];

  it.each(probes)('401s %s %s with no X-Internal-Auth header', async (method, path) => {
    const res = await (request(app) as unknown as Record<string, (p: string) => request.Test>)[method](path);
    expect(res.status).toBe(401);
  });

  it.each(probes)('401s %s %s with a wrong X-Internal-Auth value', async (method, path) => {
    const res = await (request(app) as unknown as Record<string, (p: string) => request.Test>)[method](path)
      .set('X-Internal-Auth', 'not-the-master-key');
    expect(res.status).toBe(401);
  });

  it('passes through to the route with the correct key', async () => {
    const res = await request(app).get('/internal/nodes').set(internalAuthHeader());
    expect(res.status).toBe(200);
  });

  it('leaves /health unauthenticated even though it is mounted on the same router', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });

  describe('fails closed when the master key is unset', () => {
    it('rejects even a request presenting the empty string', async () => {
      const original = config.masterKey;
      (config as { masterKey: string }).masterKey = '';
      try {
        const res = await request(app).get('/internal/nodes').set('X-Internal-Auth', '');
        expect(res.status).toBe(401);
      } finally {
        (config as { masterKey: string }).masterKey = original;
      }
    });
  });
});
