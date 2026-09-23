import request from 'supertest';

// Tiny budgets so the limiter is reachable in a test. tests/setup.ts raises the
// real ones to five figures precisely so the other 432 tests never trip it —
// which means this is the only place the limiter's behaviour is actually
// asserted. `jest.mock` of @/config is the pattern caal-still-running.test.ts
// already uses to narrow a timeout for the same reason.
jest.mock('@/config', () => {
  const actual = jest.requireActual('@/config') as { config: Record<string, unknown> };
  return {
    ...actual,
    config: {
      ...actual.config,
      rateLimitWindowMs: 60_000,
      rateLimitAuthMax: 3,
      rateLimitApiMax: 5,
    },
  };
});

import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';

const app = createApp();

beforeAll(async () => {
  await runMigrations();
});

/**
 * The platform API had no rate limiting at all — the only limiter in the
 * codebase guards agent invocation auth in the engine. CodeQL flagged 46 routes
 * for it; on `/v1/auth/login` it is a real credential-stuffing vector rather
 * than a lint finding.
 */
describe('rate limiting', () => {
  describe('/v1/auth', () => {
    it('returns 429 once the strict budget is spent', async () => {
      const attempt = () =>
        request(app)
          .post('/v1/auth/login')
          .send({ email: 'nobody@example.com', password: 'wrong-password' });

      // Three allowed, whatever they answer — a failed login still costs budget,
      // which is the entire point.
      for (let i = 0; i < 3; i++) {
        const res = await attempt();
        expect(res.status).not.toBe(429);
      }

      const limited = await attempt();
      expect(limited.status).toBe(429);
      expect(limited.body).toMatchObject({ code: 'RATE_LIMITED' });
    });

    it('sends the standard RateLimit header so a client can back off', async () => {
      const res = await request(app)
        .post('/v1/auth/login')
        .send({ email: 'nobody@example.com', password: 'wrong-password' });

      expect(res.headers).toHaveProperty('ratelimit');
      // The legacy X-RateLimit-* set is deliberately off.
      expect(res.headers).not.toHaveProperty('x-ratelimit-limit');
    });
  });

  describe('scope', () => {
    /**
     * /internal/* is engine-to-API traffic — session load and save run on every
     * agent run. Throttling it would throttle agent execution itself.
     */
    it('never limits the internal plane', async () => {
      for (let i = 0; i < 12; i++) {
        const res = await request(app).post('/internal/sessions/does-not-exist/load').send({});
        expect(res.status).not.toBe(429);
      }
    });

    /** A monitor must not be able to rate-limit itself out of observing us. */
    it('never limits the health route', async () => {
      for (let i = 0; i < 12; i++) {
        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
      }
    });
  });
});
