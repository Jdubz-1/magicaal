import * as crypto from 'node:crypto';
import type {
  ExecutionContext,
  IntegrationPackage,
  IntegrationTriggerHandler,
  NodeModule,
} from '@magicaal/sdk-node';
import { IntegrationError, errorFromResponse, resolveField } from '@magicaal/integration-core';

interface ZendeskAuth {
  baseUrl: string;
  authHeader: string;
}

function auth(ctx: ExecutionContext, connectionId: string): ZendeskAuth {
  const creds = ctx.credentials[connectionId];
  const extra = creds?.extra ?? {};
  const baseUrl = typeof extra.base_url === 'string' ? extra.base_url.replace(/\/$/, '') : undefined;
  const email = typeof extra.email === 'string' ? extra.email : undefined;
  const apiToken = creds?.apiKey ?? (typeof extra.api_token === 'string' ? extra.api_token : undefined);

  if (creds?.accessToken && baseUrl) {
    return { baseUrl, authHeader: `Bearer ${creds.accessToken}` };
  }
  if (!baseUrl || !email || !apiToken) {
    throw new IntegrationError({
      service: 'zendesk',
      message: `zendesk: connection "${connectionId}" is missing base_url, email, or api_token`,
      code: 'CONNECTION_NOT_RESOLVED',
      retryable: false,
    });
  }
  const basic = Buffer.from(`${email}/token:${apiToken}`).toString('base64');
  return { baseUrl, authHeader: `Basic ${basic}` };
}

function fail(err: unknown) {
  if (err instanceof IntegrationError) {
    return {
      status: 'failed' as const,
      outputs: {},
      error: { code: err.code ?? 'ZENDESK_ERROR', message: err.message, retryable: err.retryable },
    };
  }
  throw err;
}

interface CreateTicketConfig {
  connectionId: string;
  subject: string;
  comment: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  requesterEmail?: string;
  outputKey: string;
}

export const zendeskCreateTicket: NodeModule<CreateTicketConfig> = {
  type: 'integration:zendesk:create-ticket',
  meta: {
    name: 'Zendesk: Create Ticket',
    description: 'Creates a support ticket. Writes {id, url} to outputKey.',
    category: 'integration',
    icon: 'life-buoy',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'subject', 'comment', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'zendesk', description: 'Zendesk Integration Connection' },
        subject: { type: 'string', description: 'Ticket subject. Supports JSONata expressions starting with $.' },
        comment: { type: 'string', description: 'First comment body. Supports JSONata expressions.' },
        priority: { type: 'string', enum: ['low', 'normal', 'high', 'urgent'], description: 'Ticket priority' },
        requesterEmail: { type: 'string', description: 'Requester email. Supports JSONata expressions.' },
        outputKey: { type: 'string', description: 'Context key to write {id, url} to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { id: { type: 'number' }, url: { type: 'string' } } },
  },
  async execute(ctx, config) {
    try {
      const zd = auth(ctx, config.connectionId);
      const subject = await resolveField(ctx, config.subject);
      const comment = await resolveField(ctx, config.comment);

      const ticket: Record<string, unknown> = { subject, comment: { body: comment } };
      if (config.priority) ticket.priority = config.priority;
      if (config.requesterEmail !== undefined) {
        ticket.requester = { email: await resolveField(ctx, config.requesterEmail) };
      }

      const response = await fetch(`${zd.baseUrl}/api/v2/tickets.json`, {
        method: 'POST',
        headers: { Authorization: zd.authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket }),
      });
      if (!response.ok) throw await errorFromResponse('zendesk', response);

      const data = (await response.json()) as { ticket: { id: number; url: string } };
      const result = { id: data.ticket.id, url: data.ticket.url };
      ctx.set(config.outputKey, result);
      return { status: 'complete' as const, outputs: { [config.outputKey]: result } };
    } catch (err) {
      return fail(err);
    }
  },
};

interface AddCommentConfig {
  connectionId: string;
  ticketId: string;
  comment: string;
  isPublic?: boolean;
  outputKey: string;
}

export const zendeskAddComment: NodeModule<AddCommentConfig> = {
  type: 'integration:zendesk:add-comment',
  meta: {
    name: 'Zendesk: Add Comment',
    description: 'Adds a comment to a ticket. Writes {id} to outputKey.',
    category: 'integration',
    icon: 'message-circle',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'ticketId', 'comment', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'zendesk', description: 'Zendesk Integration Connection' },
        ticketId: { type: 'string', description: 'Ticket ID. Supports JSONata expressions starting with $.' },
        comment: { type: 'string', description: 'Comment body. Supports JSONata expressions.' },
        isPublic: { type: 'boolean', description: 'Public reply vs internal note (default: true)' },
        outputKey: { type: 'string', description: 'Context key to write {id} to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { id: { type: 'number' } } },
  },
  async execute(ctx, config) {
    try {
      const zd = auth(ctx, config.connectionId);
      const ticketId = await resolveField(ctx, config.ticketId);
      const comment = await resolveField(ctx, config.comment);

      const response = await fetch(`${zd.baseUrl}/api/v2/tickets/${encodeURIComponent(ticketId)}.json`, {
        method: 'PUT',
        headers: { Authorization: zd.authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticket: { comment: { body: comment, public: config.isPublic ?? true } },
        }),
      });
      if (!response.ok) throw await errorFromResponse('zendesk', response);

      const data = (await response.json()) as { ticket: { id: number } };
      const result = { id: data.ticket.id };
      ctx.set(config.outputKey, result);
      return { status: 'complete' as const, outputs: { [config.outputKey]: result } };
    } catch (err) {
      return fail(err);
    }
  },
};

/**
 * Zendesk webhook signature: X-Zendesk-Webhook-Signature is base64
 * HMAC-SHA256 over `${timestamp}${rawBody}` keyed with the webhook signing
 * secret, timestamp in X-Zendesk-Webhook-Signature-Timestamp.
 */
export function verifyZendeskSignature(
  rawBody: string,
  headers: Record<string, string | string[] | undefined>,
  secret: string,
): boolean {
  const sigRaw = headers['x-zendesk-webhook-signature'];
  const tsRaw = headers['x-zendesk-webhook-signature-timestamp'];
  const signature = Array.isArray(sigRaw) ? sigRaw[0] : sigRaw;
  const timestamp = Array.isArray(tsRaw) ? tsRaw[0] : tsRaw;
  if (!signature || !timestamp) return false;

  const expected = crypto.createHmac('sha256', secret).update(`${timestamp}${rawBody}`).digest('base64');
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  return sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
}

export const zendeskTrigger: IntegrationTriggerHandler = {
  service: 'zendesk',
  verifySignature(rawBody, headers, secret): boolean {
    return verifyZendeskSignature(rawBody, headers, secret);
  },
  eventType(payload): string | undefined {
    // e.g. "zen:event-type:ticket.created"
    return (payload as { type?: string })?.type;
  },
};

export const ZENDESK_INTEGRATION: IntegrationPackage = {
  service: 'zendesk',
  displayName: 'Zendesk',
  description: 'Create and update support tickets; trigger agents from Zendesk webhook events.',
  version: '0.1.0',
  authType: 'api_key',
  authSchema: {
    fields: [
      { key: 'base_url', label: 'Site URL', type: 'string', required: true, description: 'e.g. https://acme.zendesk.com' },
      { key: 'email', label: 'Agent Email', type: 'string', required: true },
      { key: 'api_token', label: 'API Token', type: 'secret', required: true, description: 'Admin Center → Apps and integrations → Zendesk API' },
    ],
  },
  nodes: [zendeskCreateTicket, zendeskAddComment],
  trigger: zendeskTrigger,
};
