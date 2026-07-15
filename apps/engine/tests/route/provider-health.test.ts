import request from 'supertest';
import type { Application } from 'express';
import { buildTestApp, internalAuthHeader } from '../helpers/app';
import { healthTracker } from '@/router/health-tracker';
import { circuitBreaker } from '@/router/circuit-breaker';

describe('GET /internal/llm/provider-health (ALIGN-024)', () => {
  let app: Application;

  beforeAll(async () => {
    app = await buildTestApp();
  });

  it('reports circuit state, P50, error rate, and samples per target', async () => {
    healthTracker.record('target-fast', 100, false);
    healthTracker.record('target-fast', 200, false);
    healthTracker.record('target-fast', 300, true);

    // Trip a breaker for a target with no recorded samples
    for (let i = 0; i < 5; i++) circuitBreaker.recordFailure('target-tripped');

    const res = await request(app).get('/internal/llm/provider-health').set(internalAuthHeader());

    expect(res.status).toBe(200);
    expect(typeof res.body.timestamp).toBe('string');

    interface HealthTarget {
      targetId: string;
      circuitState: string;
      p50Ms: number | null;
      errorRate: number;
      sampleCount: number;
    }
    const byId = Object.fromEntries(
      (res.body.targets as HealthTarget[]).map((t) => [t.targetId, t]),
    );

    expect(byId['target-fast']).toMatchObject({
      circuitState: 'CLOSED',
      p50Ms: 200,
      sampleCount: 3,
    });
    expect(byId['target-fast'].errorRate).toBeCloseTo(1 / 3);

    // Breaker-only targets still appear, with empty stats
    expect(byId['target-tripped']).toMatchObject({
      circuitState: 'OPEN',
      p50Ms: null,
      sampleCount: 0,
    });
  });

  it('requires internal auth', async () => {
    const res = await request(app).get('/internal/llm/provider-health');
    expect(res.status).toBe(401);
  });
});
