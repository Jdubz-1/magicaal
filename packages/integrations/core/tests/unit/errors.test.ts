import { IntegrationError, isRetryableStatus, errorFromResponse } from '../../src/errors';

describe('isRetryableStatus', () => {
  it('marks 408, 429, and 5xx retryable', () => {
    expect(isRetryableStatus(408)).toBe(true);
    expect(isRetryableStatus(429)).toBe(true);
    expect(isRetryableStatus(500)).toBe(true);
    expect(isRetryableStatus(503)).toBe(true);
  });

  it('marks 4xx (other than 408/429) and undefined not retryable', () => {
    expect(isRetryableStatus(400)).toBe(false);
    expect(isRetryableStatus(401)).toBe(false);
    expect(isRetryableStatus(404)).toBe(false);
    expect(isRetryableStatus(undefined)).toBe(false);
  });
});

describe('IntegrationError', () => {
  it('defaults retryable from status', () => {
    const err = new IntegrationError({ service: 'slack', message: 'rate limited', status: 429 });
    expect(err.retryable).toBe(true);
    expect(err.name).toBe('IntegrationError');
    expect(err.service).toBe('slack');
  });

  it('respects an explicit retryable flag over the status default', () => {
    const err = new IntegrationError({
      service: 'stripe',
      message: 'lock timeout',
      status: 400,
      retryable: true,
    });
    expect(err.retryable).toBe(true);
  });
});

describe('errorFromResponse', () => {
  it('extracts message from a {error} JSON body (Slack style)', async () => {
    const response = new Response(JSON.stringify({ ok: false, error: 'channel_not_found' }), {
      status: 404,
    });
    const err = await errorFromResponse('slack', response);
    expect(err.message).toBe('slack: channel_not_found');
    expect(err.code).toBe('channel_not_found');
    expect(err.status).toBe(404);
  });

  it('extracts message from a {message} JSON body (GitHub style)', async () => {
    const response = new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 });
    const err = await errorFromResponse('github', response);
    expect(err.message).toBe('github: Not Found');
  });

  it('falls back to status text for non-JSON bodies', async () => {
    const response = new Response('gateway timeout', { status: 504 });
    const err = await errorFromResponse('jira', response);
    expect(err.message).toBe('jira: gateway timeout');
    expect(err.retryable).toBe(true);
  });

  it('handles an empty body', async () => {
    const response = new Response(null, { status: 500 });
    const err = await errorFromResponse('hubspot', response);
    expect(err.message).toContain('failed with status 500');
  });
});
