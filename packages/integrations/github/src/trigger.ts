import * as crypto from 'node:crypto';
import type { IntegrationTriggerHandler } from '@magicaal/sdk-node';

function header(
  headers: Record<string, string | string[] | undefined>,
  name: string,
): string | undefined {
  const value = headers[name] ?? headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

/**
 * GitHub webhook signature scheme: HMAC-SHA256 over the raw body keyed with
 * the webhook secret, compared against X-Hub-Signature-256 ("sha256=<hex>").
 */
export function verifyGithubSignature(
  rawBody: string,
  headers: Record<string, string | string[] | undefined>,
  secret: string,
): boolean {
  const signature = header(headers, 'x-hub-signature-256');
  if (!signature) return false;

  const expected = `sha256=${crypto.createHmac('sha256', secret).update(rawBody).digest('hex')}`;
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  return sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
}

export const githubTrigger: IntegrationTriggerHandler = {
  service: 'github',

  verifySignature(rawBody, headers, secret): boolean {
    return verifyGithubSignature(rawBody, headers, secret);
  },

  handshake(payload): unknown | undefined {
    // GitHub sends a "ping" event when a webhook is created — acknowledge it
    // without dispatching a run.
    const body = payload as { zen?: string; hook_id?: number };
    if (body?.zen !== undefined && body?.hook_id !== undefined) {
      return { ok: true };
    }
    return undefined;
  },

  eventType(payload, headers): string | undefined {
    // "push", or "pull_request.opened" when the payload carries an action
    const event = header(headers, 'x-github-event');
    if (!event) return undefined;
    const action = (payload as { action?: string })?.action;
    return action ? `${event}.${action}` : event;
  },
};
