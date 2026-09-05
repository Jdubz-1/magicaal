import { Writable } from 'node:stream';
import pino from 'pino';
import { LOG_REDACT } from '../../src/lib/logger';

/**
 * pino-http logs req.headers wholesale, which carries the caller's bearer
 * token. These assert the real redact configuration the app ships with, applied
 * to the log shape pino-http actually produces.
 */
function captureLogs(): { lines: string[]; log: pino.Logger } {
  const lines: string[] = [];
  const stream = new Writable({
    write(chunk, _enc, cb) {
      lines.push(String(chunk));
      cb();
    },
  });
  return { lines, log: pino({ redact: LOG_REDACT }, stream) };
}

const BEARER = 'Bearer eyJhbGciOiJIUzI1NiJ9.payload.signature';

describe('logger redaction', () => {
  it('redacts the authorization header', () => {
    const { lines, log } = captureLogs();
    log.info({ req: { headers: { authorization: BEARER, host: 'localhost:3000' } } }, 'request');

    const entry = JSON.parse(lines[0]);
    expect(entry.req.headers.authorization).toBe('[Redacted]');
    expect(lines[0]).not.toContain('eyJhbGciOiJIUzI1NiJ9');
    // Non-sensitive headers are untouched.
    expect(entry.req.headers.host).toBe('localhost:3000');
  });

  it('redacts the request cookie header', () => {
    const { lines, log } = captureLogs();
    log.info({ req: { headers: { cookie: 'refresh_token=secret-value' } } }, 'request');

    expect(JSON.parse(lines[0]).req.headers.cookie).toBe('[Redacted]');
    expect(lines[0]).not.toContain('secret-value');
  });

  it('redacts the internal engine<->API auth header', () => {
    const { lines, log } = captureLogs();
    log.info({ req: { headers: { 'x-internal-auth': 'shared-secret' } } }, 'request');

    expect(JSON.parse(lines[0]).req.headers['x-internal-auth']).toBe('[Redacted]');
    expect(lines[0]).not.toContain('shared-secret');
  });

  it('redacts set-cookie on the response', () => {
    const { lines, log } = captureLogs();
    log.info({ res: { headers: { 'set-cookie': 'refresh_token=issued-value; HttpOnly' } } }, 'response');

    expect(JSON.parse(lines[0]).res.headers['set-cookie']).toBe('[Redacted]');
    expect(lines[0]).not.toContain('issued-value');
  });

  it('applies to child loggers, which is how pino-http gets its logger', () => {
    const { lines, log } = captureLogs();
    log.child({ component: 'http' }).info({ req: { headers: { authorization: BEARER } } }, 'request');

    expect(JSON.parse(lines[0]).req.headers.authorization).toBe('[Redacted]');
  });
});
