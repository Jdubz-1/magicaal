jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

import { sessionManager } from '@/session/session-manager';
import type { SessionConfig } from '@magicaal/core';

const CONFIG: SessionConfig = { enabled: true, ttlSeconds: 3600, schemaVersion: 1, contextSchema: {} };

describe('SessionManager metadata threading (ALIGN-011)', () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  function bodyOfCall(index: number): Record<string, unknown> {
    return JSON.parse((fetchMock.mock.calls[index][1] as { body: string }).body) as Record<
      string,
      unknown
    >;
  }

  it('passes metadata to createSession when loading a session that does not exist yet', async () => {
    fetchMock
      .mockResolvedValueOnce({ ok: false, status: 404, text: async () => 'not found' })
      .mockResolvedValueOnce({ ok: true, status: 201, json: async () => ({ ok: true }) });

    const loaded = await sessionManager.loadSession('s1', 'a1', 't1', CONFIG, { customer: 'acme' });

    expect(loaded.contextEntries.size).toBe(0);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(bodyOfCall(1)).toMatchObject({
      sessionId: 's1',
      agentId: 'a1',
      tenantId: 't1',
      metadata: { customer: 'acme' },
    });
  });

  it('omits metadata from the create body when none was supplied', async () => {
    fetchMock
      .mockResolvedValueOnce({ ok: false, status: 404, text: async () => 'not found' })
      .mockResolvedValueOnce({ ok: true, status: 201, json: async () => ({ ok: true }) });

    await sessionManager.loadSession('s2', 'a1', 't1', CONFIG);

    expect('metadata' in bodyOfCall(1)).toBe(false);
  });

  it('does not re-send metadata for an existing session', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        session: { id: 's3', status: 'active', schemaVersion: 1 },
        contextEntries: { history: ['hi'] },
      }),
    });

    const loaded = await sessionManager.loadSession('s3', 'a1', 't1', CONFIG, { ignored: true });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(loaded.contextEntries.get('history')).toEqual(['hi']);
  });
});
