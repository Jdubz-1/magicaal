import { sessionsCommand } from '../../src/commands/sessions';

describe('sessions migrate command (ALIGN-013)', () => {
  const fetchMock = jest.fn();
  let errorSpy: jest.SpyInstance;
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    process.exitCode = undefined;
    delete process.env.MAGICAAL_API_TOKEN;
  });

  afterEach(() => {
    errorSpy.mockRestore();
    logSpy.mockRestore();
    process.exitCode = undefined;
  });

  it('sends a Bearer token from --token', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ migrated: 2, skipped: 1, failed: 0 }),
    });

    await sessionsCommand('migrate', 'my-agent', 'http://api.test', 'tok-123');

    expect(fetchMock).toHaveBeenCalledWith(
      'http://api.test/v1/agents/my-agent/sessions/migrate',
      { method: 'POST', headers: { Authorization: 'Bearer tok-123' } },
    );
    expect(process.exitCode).toBeUndefined();
    expect(logSpy).toHaveBeenCalledWith('Migrated: 2, Skipped: 1, Failed: 0');
  });

  it('falls back to MAGICAAL_API_TOKEN', async () => {
    process.env.MAGICAAL_API_TOKEN = 'env-tok';
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ migrated: 0, skipped: 0, failed: 0 }),
    });

    await sessionsCommand('migrate', 'my-agent', 'http://api.test');

    const [, init] = fetchMock.mock.calls[0] as [string, { headers: Record<string, string> }];
    expect(init.headers.Authorization).toBe('Bearer env-tok');
  });

  it('errors out without any token, before making a request', async () => {
    await sessionsCommand('migrate', 'my-agent', 'http://api.test');

    expect(fetchMock).not.toHaveBeenCalled();
    expect(process.exitCode).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('API token is required'),
    );
  });

  it('reports auth failures with actionable guidance', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 401, text: async () => 'unauthorized' });

    await sessionsCommand('migrate', 'my-agent', 'http://api.test', 'bad-token');

    expect(process.exitCode).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('authentication failed'));
  });

  it('reports an unknown agent handle', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 404, text: async () => 'not found' });

    await sessionsCommand('migrate', 'ghost', 'http://api.test', 'tok');

    expect(process.exitCode).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('ghost'));
  });

  it('requires --agent', async () => {
    await sessionsCommand('migrate', undefined, 'http://api.test', 'tok');
    expect(process.exitCode).toBe(1);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
