import request from 'supertest';
import { createApp } from '../../src/app';

const app = createApp();

describe('GET /health', () => {
  it('returns 200 with status OK', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
  });

  it('returns a valid ISO timestamp', async () => {
    const res = await request(app).get('/health');

    expect(res.body.timestamp).toBeDefined();
    expect(() => new Date(res.body.timestamp)).not.toThrow();
  });
});

describe('GET /nonexistent', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/nonexistent');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Not Found');
  });
});
