import * as crypto from 'node:crypto';
import type {
  ExecutionContext,
  IntegrationPackage,
  IntegrationTriggerHandler,
  NodeModule,
} from '@magicaal/sdk-node';
import { IntegrationError, errorFromResponse, resolveField, collectAll } from '@magicaal/integration-core';

const API = 'https://gmail.googleapis.com/gmail/v1';

function token(ctx: ExecutionContext, connectionId: string): string {
  const creds = ctx.credentials[connectionId];
  const value = creds?.accessToken ?? creds?.apiKey;
  if (!value) {
    throw new IntegrationError({
      service: 'gmail',
      message: `gmail: no usable token for connection "${connectionId}"`,
      code: 'CONNECTION_NOT_RESOLVED',
      retryable: false,
    });
  }
  return value;
}

function fail(err: unknown) {
  if (err instanceof IntegrationError) {
    return {
      status: 'failed' as const,
      outputs: {},
      error: { code: err.code ?? 'GMAIL_ERROR', message: err.message, retryable: err.retryable },
    };
  }
  throw err;
}

interface SendEmailConfig {
  connectionId: string;
  to: string;
  subject: string;
  body: string;
  outputKey: string;
}

export const gmailSendEmail: NodeModule<SendEmailConfig> = {
  type: 'integration:gmail:send-email',
  meta: {
    name: 'Gmail: Send Email',
    description: 'Sends a plain-text email via users.messages.send. Writes {id, threadId} to outputKey.',
    category: 'integration',
    icon: 'mail',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'to', 'subject', 'body', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'gmail', description: 'Gmail Integration Connection' },
        to: { type: 'string', description: 'Recipient address. Supports JSONata expressions starting with $.' },
        subject: { type: 'string', description: 'Subject line. Supports JSONata expressions.' },
        body: { type: 'string', description: 'Plain-text body. Supports JSONata expressions.' },
        outputKey: { type: 'string', description: 'Context key to write {id, threadId} to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { id: { type: 'string' }, threadId: { type: 'string' } } },
  },
  async execute(ctx, config) {
    try {
      const accessToken = token(ctx, config.connectionId);
      const to = await resolveField(ctx, config.to);
      const subject = await resolveField(ctx, config.subject);
      const body = await resolveField(ctx, config.body);

      const rfc822 = `To: ${to}\r\nSubject: ${subject}\r\nContent-Type: text/plain; charset=utf-8\r\n\r\n${body}`;
      const raw = Buffer.from(rfc822).toString('base64url');

      const response = await fetch(`${API}/users/me/messages/send`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw }),
      });
      if (!response.ok) throw await errorFromResponse('gmail', response);

      const data = (await response.json()) as { id: string; threadId: string };
      const result = { id: data.id, threadId: data.threadId };
      ctx.set(config.outputKey, result);
      return { status: 'complete' as const, outputs: { [config.outputKey]: result } };
    } catch (err) {
      return fail(err);
    }
  },
};

interface ListMessagesConfig {
  connectionId: string;
  query?: string;
  maxMessages?: number;
  outputKey: string;
}

export const gmailListMessages: NodeModule<ListMessagesConfig> = {
  type: 'integration:gmail:list-messages',
  meta: {
    name: 'Gmail: List Messages',
    description: 'Lists message IDs matching a Gmail search query, following pageToken pagination. Writes an array of {id, threadId} to outputKey.',
    category: 'integration',
    icon: 'inbox',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'gmail', description: 'Gmail Integration Connection' },
        query: { type: 'string', description: 'Gmail search query (e.g. is:unread from:boss@acme.com)' },
        maxMessages: { type: 'number', description: 'Maximum messages to return (default: 200)' },
        outputKey: { type: 'string', description: 'Context key to write the message array to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { messages: { type: 'array' } } },
  },
  async execute(ctx, config) {
    try {
      const accessToken = token(ctx, config.connectionId);
      const messages = await collectAll<{ id: string; threadId: string }, string>(
        async (cursor) => {
          const params = new URLSearchParams({ maxResults: '100' });
          if (config.query) params.set('q', config.query);
          if (cursor) params.set('pageToken', cursor);
          const response = await fetch(`${API}/users/me/messages?${params}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (!response.ok) throw await errorFromResponse('gmail', response);
          const data = (await response.json()) as {
            messages?: Array<{ id: string; threadId: string }>;
            nextPageToken?: string;
          };
          return { items: data.messages ?? [], nextCursor: data.nextPageToken ?? null };
        },
        { maxItems: config.maxMessages ?? 200 },
      );
      ctx.set(config.outputKey, messages);
      return { status: 'complete' as const, outputs: { [config.outputKey]: messages } };
    } catch (err) {
      return fail(err);
    }
  },
};

/**
 * Gmail push notifications arrive via Google API watch channels. Google
 * echoes the channel token set at watch registration in
 * X-Goog-Channel-Token; the registration secret is that token. Constant-time
 * comparison; no body HMAC exists in Google's scheme.
 */
export const gmailTrigger: IntegrationTriggerHandler = {
  service: 'gmail',
  verifySignature(_rawBody, headers, secret): boolean {
    const raw = headers['x-goog-channel-token'];
    const channelToken = Array.isArray(raw) ? raw[0] : raw;
    if (!channelToken) return false;
    const a = Buffer.from(channelToken);
    const b = Buffer.from(secret);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  },
  eventType(_payload, headers): string | undefined {
    const raw = headers['x-goog-resource-state'];
    return Array.isArray(raw) ? raw[0] : raw;
  },
};

export const GMAIL_INTEGRATION: IntegrationPackage = {
  service: 'gmail',
  displayName: 'Gmail',
  description: 'Send email, search messages, and trigger agents from mailbox change notifications.',
  version: '0.1.0',
  authType: 'oauth2',
  authSchema: {
    fields: [
      { key: 'access_token', label: 'Access Token', type: 'secret', required: true },
      { key: 'refresh_token', label: 'Refresh Token', type: 'secret', description: 'Enables automatic token refresh' },
    ],
    oauth: {
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      scopes: ['https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/gmail.readonly'],
    },
  },
  nodes: [gmailSendEmail, gmailListMessages],
  trigger: gmailTrigger,
};
