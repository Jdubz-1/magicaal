import type { ExecutionContext, IntegrationPackage, NodeModule } from '@magicaal/sdk-node';
import { IntegrationError, errorFromResponse, resolveField } from '@magicaal/integration-core';

const API = 'https://api.sendgrid.com/v3';

function apiKey(ctx: ExecutionContext, connectionId: string): string {
  const creds = ctx.credentials[connectionId];
  const value = creds?.apiKey ?? creds?.accessToken;
  if (!value) {
    throw new IntegrationError({
      service: 'sendgrid',
      message: `sendgrid: no usable API key for connection "${connectionId}"`,
      code: 'CONNECTION_NOT_RESOLVED',
      retryable: false,
    });
  }
  return value;
}

interface SendEmailConfig {
  connectionId: string;
  to: string;
  from: string;
  subject: string;
  body: string;
  html?: boolean;
  outputKey: string;
}

export const sendgridSendEmail: NodeModule<SendEmailConfig> = {
  type: 'integration:sendgrid:send-email',
  meta: {
    name: 'SendGrid: Send Email',
    description: 'Sends an email via the v3 mail/send API. Writes {messageId} to outputKey.',
    category: 'integration',
    icon: 'send',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'to', 'from', 'subject', 'body', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'sendgrid', description: 'SendGrid Integration Connection' },
        to: { type: 'string', description: 'Recipient address. Supports JSONata expressions starting with $.' },
        from: { type: 'string', description: 'Verified sender address' },
        subject: { type: 'string', description: 'Subject line. Supports JSONata expressions.' },
        body: { type: 'string', description: 'Email body. Supports JSONata expressions.' },
        html: { type: 'boolean', description: 'Send body as text/html (default: plain text)' },
        outputKey: { type: 'string', description: 'Context key to write {messageId} to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { messageId: { type: 'string' } } },
  },
  async execute(ctx, config) {
    try {
      const key = apiKey(ctx, config.connectionId);
      const to = await resolveField(ctx, config.to);
      const subject = await resolveField(ctx, config.subject);
      const body = await resolveField(ctx, config.body);

      const response = await fetch(`${API}/mail/send`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: config.from },
          subject,
          content: [{ type: config.html ? 'text/html' : 'text/plain', value: body }],
        }),
      });
      if (!response.ok) throw await errorFromResponse('sendgrid', response);

      const result = { messageId: response.headers.get('x-message-id') ?? '' };
      ctx.set(config.outputKey, result);
      return { status: 'complete' as const, outputs: { [config.outputKey]: result } };
    } catch (err) {
      if (err instanceof IntegrationError) {
        return {
          status: 'failed' as const,
          outputs: {},
          error: { code: err.code ?? 'SENDGRID_ERROR', message: err.message, retryable: err.retryable },
        };
      }
      throw err;
    }
  },
};

export const SENDGRID_INTEGRATION: IntegrationPackage = {
  service: 'sendgrid',
  displayName: 'SendGrid',
  description: 'Send transactional email via the SendGrid v3 API.',
  version: '0.1.0',
  authType: 'api_key',
  authSchema: {
    fields: [
      { key: 'api_key', label: 'API Key', type: 'secret', required: true, description: 'SendGrid API key with Mail Send permission' },
    ],
  },
  nodes: [sendgridSendEmail],
};
