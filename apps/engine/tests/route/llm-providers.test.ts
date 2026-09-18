import request from 'supertest';
import type { Application } from 'express';
import { buildTestApp, internalAuthHeader } from '../helpers/app';
import { providerAdapterRegistry } from '@/router/provider-adapter-registry';
import { anthropicAdapter } from '@/router/adapters/anthropic';
import { openAIAdapter } from '@/router/adapters/openai';
import { googleAdapter } from '@/router/adapters/google';

const KEY = 'sk-test-secret-key';

describe('model provider catalog + credential validation', () => {
  let app: Application;
  const originalFetch = global.fetch;
  let fetchMock: jest.Mock;

  beforeAll(async () => {
    app = await buildTestApp();
    for (const adapter of [anthropicAdapter, openAIAdapter, googleAdapter]) {
      providerAdapterRegistry.register(adapter);
    }
  });

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe('GET /internal/llm/providers', () => {
    it('lists each built-in provider with an api_key field and a recommended model', async () => {
      const res = await request(app).get('/internal/llm/providers').set(internalAuthHeader());

      expect(res.status).toBe(200);
      interface CatalogEntry {
        provider: string;
        authFields: Array<{ key: string; type: string }>;
        models: Array<{ recommended?: boolean }>;
      }
      const byId: Record<string, CatalogEntry> = Object.fromEntries(
        (res.body as CatalogEntry[]).map((p) => [p.provider, p]),
      );

      for (const id of ['anthropic', 'openai', 'google']) {
        expect(byId[id]).toBeDefined();
        expect(byId[id].authFields).toEqual([expect.objectContaining({ key: 'api_key', type: 'secret' })]);
        expect(byId[id].models.filter((m) => m.recommended)).toHaveLength(1);
      }
    });

    it('requires internal auth', async () => {
      const res = await request(app).get('/internal/llm/providers');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /internal/llm/providers/:provider/validate', () => {
    const validate = (provider: string, credentials: Record<string, unknown> = { api_key: KEY }) =>
      request(app)
        .post(`/internal/llm/providers/${provider}/validate`)
        .set(internalAuthHeader())
        .send({ credentials });

    it('accepts a key the provider accepts, probing the list-models endpoint', async () => {
      fetchMock.mockResolvedValue(new Response('{}', { status: 200 }));

      const res = await validate('anthropic');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ ok: true });
      const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(url).toBe('https://api.anthropic.com/v1/models');
      expect(init.method).toBe('GET');
      expect((init.headers as Record<string, string>)['x-api-key']).toBe(KEY);
    });

    it('sends the OpenAI key as a bearer token', async () => {
      fetchMock.mockResolvedValue(new Response('{}', { status: 200 }));

      await validate('openai');

      const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(url).toBe('https://api.openai.com/v1/models');
      expect((init.headers as Record<string, string>).Authorization).toBe(`Bearer ${KEY}`);
    });

    it('keeps the Google key out of the URL', async () => {
      fetchMock.mockResolvedValue(new Response('{}', { status: 200 }));

      await validate('google');

      const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(url).not.toContain(KEY);
      expect((init.headers as Record<string, string>)['x-goog-api-key']).toBe(KEY);
    });

    it.each([401, 403])('reports invalid_key on %i without echoing the key', async (status) => {
      fetchMock.mockResolvedValue(new Response('{}', { status }));

      const res = await validate('openai');

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ ok: false, reason: 'invalid_key' });
      expect(JSON.stringify(res.body)).not.toContain(KEY);
    });

    it('reports invalid_key for a 400 that names the key (Gemini)', async () => {
      // Gemini answers a bad key with 400 INVALID_ARGUMENT / API_KEY_INVALID and
      // uses 403 for a valid key lacking permission — treating that as "unknown"
      // surfaced a typo as "provider unreachable, save anyway".
      fetchMock.mockResolvedValue(
        new Response(JSON.stringify({ error: { status: 'INVALID_ARGUMENT', message: 'API_KEY_INVALID' } }), { status: 400 }),
      );

      const res = await validate('google');

      expect(res.body).toMatchObject({ ok: false, reason: 'invalid_key' });
      expect(JSON.stringify(res.body)).not.toContain(KEY);
    });

    it('leaves an unrelated 400 as unknown', async () => {
      fetchMock.mockResolvedValue(new Response(JSON.stringify({ error: 'malformed request' }), { status: 400 }));

      const res = await validate('anthropic');

      expect(res.body).toMatchObject({ ok: false, reason: 'unknown' });
    });

    it('takes the required credential fields from the descriptor', async () => {
      // A third-party adapter may declare `{ key: 'token' }`; hardcoding
      // api_key 400'd it after the API-side check had already passed.
      const res = await validate('anthropic', { token: 'not-the-declared-field' });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('api_key');
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('reports unreachable when the provider cannot be reached', async () => {
      fetchMock.mockRejectedValue(new TypeError('fetch failed'));

      const res = await validate('anthropic');

      expect(res.body).toMatchObject({ ok: false, reason: 'unreachable' });
    });

    it('reports unknown for other provider errors', async () => {
      fetchMock.mockResolvedValue(new Response('{}', { status: 500 }));

      const res = await validate('google');

      expect(res.body).toMatchObject({ ok: false, reason: 'unknown' });
    });

    it('404s for an unregistered provider', async () => {
      const res = await validate('not-a-provider');
      expect(res.status).toBe(404);
      expect(res.body.code).toBe('PROVIDER_NOT_FOUND');
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('400s when api_key is missing', async () => {
      const res = await validate('anthropic', {});
      expect(res.status).toBe(400);
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });
});
