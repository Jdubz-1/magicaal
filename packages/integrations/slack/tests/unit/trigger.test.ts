import * as crypto from 'node:crypto';
import { slackTrigger, verifySlackSignature } from '../../src/trigger';

const SECRET = 'test-signing-secret';
const NOW_S = 1_700_000_000;

function sign(rawBody: string, timestamp: number, secret: string = SECRET): string {
  return `v0=${crypto
    .createHmac('sha256', secret)
    .update(`v0:${timestamp}:${rawBody}`)
    .digest('hex')}`;
}

function headersFor(rawBody: string, timestamp: number = NOW_S) {
  return {
    'x-slack-request-timestamp': String(timestamp),
    'x-slack-signature': sign(rawBody, timestamp),
  };
}

describe('verifySlackSignature', () => {
  const body = JSON.stringify({ type: 'event_callback', event: { type: 'message' } });

  it('accepts a correctly signed request', () => {
    expect(verifySlackSignature(body, headersFor(body), SECRET, NOW_S)).toBe(true);
  });

  it('rejects a tampered body', () => {
    const headers = headersFor(body);
    const tampered = body.replace('message', 'app_mention');
    expect(verifySlackSignature(tampered, headers, SECRET, NOW_S)).toBe(false);
  });

  it('rejects a wrong secret', () => {
    const headers = {
      'x-slack-request-timestamp': String(NOW_S),
      'x-slack-signature': sign(body, NOW_S, 'other-secret'),
    };
    expect(verifySlackSignature(body, headers, SECRET, NOW_S)).toBe(false);
  });

  it('rejects a stale timestamp (replay guard)', () => {
    const stale = NOW_S - 6 * 60; // 6 minutes old
    expect(verifySlackSignature(body, headersFor(body, stale), SECRET, NOW_S)).toBe(false);
  });

  it('rejects missing signature headers', () => {
    expect(verifySlackSignature(body, {}, SECRET, NOW_S)).toBe(false);
  });
});

describe('slackTrigger', () => {
  it('answers the url_verification handshake with the challenge', () => {
    const response = slackTrigger.handshake!({
      type: 'url_verification',
      challenge: 'abc123',
    });
    expect(response).toEqual({ challenge: 'abc123' });
  });

  it('returns undefined handshake for normal events', () => {
    expect(slackTrigger.handshake!({ type: 'event_callback' })).toBeUndefined();
  });

  it('extracts the inner event type', () => {
    expect(
      slackTrigger.eventType({ type: 'event_callback', event: { type: 'app_mention' } }, {}),
    ).toBe('app_mention');
  });
});
