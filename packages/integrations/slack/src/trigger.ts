import * as crypto from 'node:crypto';
import type { IntegrationTriggerHandler } from '@magicaal/sdk-node';

const SIGNATURE_VERSION = 'v0';
const MAX_TIMESTAMP_SKEW_S = 60 * 5; // Slack recommends rejecting requests older than 5 minutes

function header(
  headers: Record<string, string | string[] | undefined>,
  name: string,
): string | undefined {
  const value = headers[name] ?? headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Slack Events API signature scheme: HMAC-SHA256 over
 * `v0:{timestamp}:{rawBody}` keyed with the app's signing secret, compared
 * against the X-Slack-Signature header. Timestamps outside a 5-minute window
 * are rejected to prevent replay.
 */
export function verifySlackSignature(
  rawBody: string,
  headers: Record<string, string | string[] | undefined>,
  signingSecret: string,
  nowS: number = Math.floor(Date.now() / 1000),
): boolean {
  const timestamp = header(headers, 'x-slack-request-timestamp');
  const signature = header(headers, 'x-slack-signature');
  if (!timestamp || !signature) return false;

  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(nowS - ts) > MAX_TIMESTAMP_SKEW_S) return false;

  const base = `${SIGNATURE_VERSION}:${timestamp}:${rawBody}`;
  const expected = `${SIGNATURE_VERSION}=${crypto
    .createHmac('sha256', signingSecret)
    .update(base)
    .digest('hex')}`;

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  return sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
}

export const slackTrigger: IntegrationTriggerHandler = {
  service: 'slack',

  verifySignature(rawBody, headers, secret): boolean {
    return verifySlackSignature(rawBody, headers, secret);
  },

  handshake(payload): unknown | undefined {
    const body = payload as { type?: string; challenge?: string };
    if (body?.type === 'url_verification' && typeof body.challenge === 'string') {
      return { challenge: body.challenge };
    }
    return undefined;
  },

  eventType(payload): string | undefined {
    const body = payload as { event?: { type?: string } };
    return body?.event?.type;
  },
};
