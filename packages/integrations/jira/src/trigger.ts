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
 * Jira webhook signature scheme (Jira 8.19+ / Data Center): HMAC-SHA256 over
 * the raw body, sent as X-Hub-Signature ("sha256=<hex>"). Jira Cloud system
 * webhooks do not sign requests — Cloud users should route through an
 * Automation rule with a secret header, which sends the same X-Hub-Signature
 * form.
 */
export function verifyJiraSignature(
  rawBody: string,
  headers: Record<string, string | string[] | undefined>,
  secret: string,
): boolean {
  const signature = header(headers, 'x-hub-signature');
  if (!signature) return false;

  const expected = `sha256=${crypto.createHmac('sha256', secret).update(rawBody).digest('hex')}`;
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  return sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
}

export const jiraTrigger: IntegrationTriggerHandler = {
  service: 'jira',

  verifySignature(rawBody, headers, secret): boolean {
    return verifyJiraSignature(rawBody, headers, secret);
  },

  eventType(payload): string | undefined {
    // e.g. "jira:issue_created", "comment_created"
    return (payload as { webhookEvent?: string })?.webhookEvent;
  },
};
