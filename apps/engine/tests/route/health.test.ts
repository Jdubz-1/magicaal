import request from 'supertest';
import { buildTestApp } from '../helpers/app';
import type { Application } from 'express';

describe('GET /health', () => {
  let app: Application;

  beforeAll(async () => {
    app = await buildTestApp();
  });

  it('answers without any auth header — the container healthcheck depends on it', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'OK', service: 'engine' });
  });
});
