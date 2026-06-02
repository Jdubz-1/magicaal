import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

interface WebhookReceiveConfig {
  payloadKey?: string;
  headersKey?: string;
  outputKey: string;
}

export const coreWebhookReceive: NodeModule<WebhookReceiveConfig> = {
  type: 'core:webhook-receive',
  meta: {
    name: 'Webhook Receive',
    description:
      'Reads the inbound webhook payload set by the trigger infrastructure when an agent is invoked via its webhook URL. Writes the normalised payload to outputKey.',
    category: 'integration',
    icon: 'anchor',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['outputKey'],
      properties: {
        payloadKey: {
          type: 'string',
          description: 'Context key holding the raw webhook body (default: _webhook_payload)',
        },
        headersKey: {
          type: 'string',
          description: 'Optional context key holding the webhook request headers',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write the normalised {body, headers?, receivedAt} payload to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _webhook_received_at: { type: 'string' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: WebhookReceiveConfig) {
    const payloadKey = config.payloadKey ?? '_webhook_payload';
    const body = ctx.get<unknown>(payloadKey);

    if (body === undefined) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'WEBHOOK_PAYLOAD_MISSING',
          message: `Webhook payload not found at context key "${payloadKey}". Ensure the agent trigger type is "webhook".`,
          retryable: false,
        },
      };
    }

    const receivedAt = new Date().toISOString();
    const result: Record<string, unknown> = { body, receivedAt };

    if (config.headersKey) {
      const headers = ctx.get<unknown>(config.headersKey);
      if (headers !== undefined) {
        result['headers'] = headers;
      }
    }

    ctx.set(config.outputKey, result);
    ctx.set('_webhook_received_at', receivedAt);

    return {
      status: 'complete' as const,
      outputs: {
        [config.outputKey]: result,
        _webhook_received_at: receivedAt,
      },
    };
  },
};
