process.env.JWT_SECRET = process.env.JWT_SECRET ?? 'test-secret';

import { proxyTimeoutFor } from '../../src/lib/api-client';
import { config } from '../../src/config';

/**
 * A Caal invoke holds the request open for the whole agent run — commonly
 * 10-25s. The proxy's flat 15s budget aborted those mid-run and reported
 * 502 "API unreachable" for work that completed server-side moments later,
 * so the answer was generated, paid for, and thrown away.
 */
describe('proxyTimeoutFor', () => {
  it('gives Caal invokes room for a whole agent run', () => {
    expect(proxyTimeoutFor('/caal/invoke')).toBe(config.caalTimeoutMs);
    expect(proxyTimeoutFor('/caal/sessions/agent-1')).toBe(config.caalTimeoutMs);
    expect(proxyTimeoutFor('/caal')).toBe(config.caalTimeoutMs);
  });

  it('leaves ordinary reads and writes on the short budget', () => {
    for (const path of ['/agents', '/agents/abc/runs', '/integrations/connections', '/caalendar']) {
      expect(proxyTimeoutFor(path)).toBe(config.apiTimeoutMs);
    }
  });

  it("outlasts the API's own wait, so its 'still running' answer wins the race", () => {
    // apps/api CAAL_INVOKE_TIMEOUT_MS defaults to 120000; the API answers
    // CAAL_STILL_RUNNING at that point, which the Studio panel handles.
    expect(config.caalTimeoutMs).toBeGreaterThan(120000);
  });
});
