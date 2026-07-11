import type { NodeModule, ExecutionContext } from '@magicaal/sdk-node';
import { IntegrationError } from '@magicaal/integration-core';
import { resolveToken, resolveField, slackCall } from '../client';

interface SlackPostMessageConfig {
  connectionId: string;
  channel: string;
  text: string;
  threadTs?: string;
  unfurlLinks?: boolean;
  outputKey: string;
}

export const slackPostMessage: NodeModule<SlackPostMessageConfig> = {
  type: 'integration:slack:post-message',
  meta: {
    name: 'Slack: Post Message',
    description:
      'Posts a message to a Slack channel via chat.postMessage. Supports thread replies. Writes {ts, channel} to outputKey.',
    category: 'integration',
    icon: 'message-square',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'channel', 'text', 'outputKey'],
      properties: {
        connectionId: {
          type: 'string',
          format: 'connection',
          service: 'slack',
          description: 'Slack Integration Connection to authenticate with',
        },
        channel: {
          type: 'string',
          description: 'Channel ID or name (e.g. C0123456789 or #general). Supports JSONata expressions starting with $.',
        },
        text: {
          type: 'string',
          description: 'Message text. Supports JSONata expressions starting with $.',
        },
        threadTs: {
          type: 'string',
          description: 'Parent message ts to reply in a thread. Supports JSONata expressions.',
        },
        unfurlLinks: {
          type: 'boolean',
          description: 'Enable link unfurling (default: true)',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write {ts, channel} to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        ts: { type: 'string' },
        channel: { type: 'string' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: SlackPostMessageConfig) {
    try {
      const token = resolveToken(ctx, config.connectionId);
      const channel = await resolveField(ctx, config.channel);
      const text = await resolveField(ctx, config.text);

      const args: Record<string, unknown> = { channel, text };
      if (config.threadTs) args.thread_ts = await resolveField(ctx, config.threadTs);
      if (config.unfurlLinks !== undefined) args.unfurl_links = config.unfurlLinks;

      const body = await slackCall(token, 'chat.postMessage', args);

      const result = { ts: body.ts as string, channel: body.channel as string };
      ctx.set(config.outputKey, result);

      return {
        status: 'complete' as const,
        outputs: { [config.outputKey]: result },
      };
    } catch (err) {
      if (err instanceof IntegrationError) {
        return {
          status: 'failed' as const,
          outputs: {},
          error: {
            code: err.code ?? 'SLACK_ERROR',
            message: err.message,
            retryable: err.retryable,
          },
        };
      }
      throw err;
    }
  },
};
