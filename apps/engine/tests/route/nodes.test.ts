import request from 'supertest';
import type { Application } from 'express';
import { buildTestApp, internalAuthHeader } from '../helpers/app';
import { registry } from '@/registry/node-registry';

describe('GET /internal/nodes', () => {
  let app: Application;

  beforeAll(async () => {
    app = await buildTestApp();
  });

  it('lists built-in nodes with no packageId — the field the API palette filter (ISS-055) keys on', async () => {
    const res = await request(app).get('/internal/nodes').set(internalAuthHeader());

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    const builtin = res.body.find((n: { type: string }) => n.type === 'core:start');
    expect(builtin).toBeDefined();
    expect(builtin.packageId).toBeUndefined();
  });

  it('tags a hot-loaded node with its owning packageId', async () => {
    registry.hotLoad(
      [
        {
          type: 'community:demo:tagged',
          meta: { name: 'Tagged', description: 'Tagged demo node', category: 'data', version: '1.0.0' },
          schema: { config: {}, input: {}, output: {} },
          execute: async () => ({ status: 'complete', outputs: {} }),
        },
      ],
      'acme/demo',
    );

    const res = await request(app).get('/internal/nodes').set(internalAuthHeader());

    const tagged = res.body.find((n: { type: string }) => n.type === 'community:demo:tagged');
    expect(tagged).toBeDefined();
    expect(tagged.packageId).toBe('acme/demo');
  });
});
