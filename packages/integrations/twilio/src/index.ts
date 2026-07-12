import type { ExecutionContext, IntegrationPackage, NodeModule } from '@magicaal/sdk-node';
import { IntegrationError, errorFromResponse, resolveField } from '@magicaal/integration-core';

interface TwilioAuth {
  accountSid: string;
  authHeader: string;
}

function auth(ctx: ExecutionContext, connectionId: string): TwilioAuth {
  const creds = ctx.credentials[connectionId];
  const extra = creds?.extra ?? {};
  const accountSid = typeof extra.account_sid === 'string' ? extra.account_sid : undefined;
  const authToken = creds?.apiKey ?? (typeof extra.auth_token === 'string' ? extra.auth_token : undefined);
  if (!accountSid || !authToken) {
    throw new IntegrationError({
      service: 'twilio',
      message: `twilio: connection "${connectionId}" is missing account_sid or auth_token`,
      code: 'CONNECTION_NOT_RESOLVED',
      retryable: false,
    });
  }
  const basic = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
  return { accountSid, authHeader: `Basic ${basic}` };
}

interface SendSmsConfig {
  connectionId: string;
  to: string;
  from: string;
  body: string;
  outputKey: string;
}

export const twilioSendSms: NodeModule<SendSmsConfig> = {
  type: 'integration:twilio:send-sms',
  meta: {
    name: 'Twilio: Send SMS',
    description: 'Sends an SMS via the Messages API. Writes {sid, status} to outputKey.',
    category: 'integration',
    icon: 'smartphone',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'to', 'from', 'body', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'twilio', description: 'Twilio Integration Connection' },
        to: { type: 'string', description: 'Destination number (E.164). Supports JSONata expressions starting with $.' },
        from: { type: 'string', description: 'Twilio number to send from (E.164)' },
        body: { type: 'string', description: 'Message text. Supports JSONata expressions.' },
        outputKey: { type: 'string', description: 'Context key to write {sid, status} to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { sid: { type: 'string' }, status: { type: 'string' } } },
  },
  async execute(ctx, config) {
    try {
      const tw = auth(ctx, config.connectionId);
      const to = await resolveField(ctx, config.to);
      const body = await resolveField(ctx, config.body);

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(tw.accountSid)}/Messages.json`,
        {
          method: 'POST',
          headers: { Authorization: tw.authHeader, 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ To: to, From: config.from, Body: body }),
        },
      );
      if (!response.ok) throw await errorFromResponse('twilio', response);

      const data = (await response.json()) as { sid: string; status: string };
      const result = { sid: data.sid, status: data.status };
      ctx.set(config.outputKey, result);
      return { status: 'complete' as const, outputs: { [config.outputKey]: result } };
    } catch (err) {
      if (err instanceof IntegrationError) {
        return {
          status: 'failed' as const,
          outputs: {},
          error: { code: err.code ?? 'TWILIO_ERROR', message: err.message, retryable: err.retryable },
        };
      }
      throw err;
    }
  },
};

export const TWILIO_INTEGRATION: IntegrationPackage = {
  service: 'twilio',
  displayName: 'Twilio',
  description: 'Send SMS messages via the Twilio Messages API.',
  version: '0.1.0',
  authType: 'api_key',
  authSchema: {
    fields: [
      { key: 'account_sid', label: 'Account SID', type: 'string', required: true },
      { key: 'auth_token', label: 'Auth Token', type: 'secret', required: true },
    ],
  },
  nodes: [twilioSendSms],
};
