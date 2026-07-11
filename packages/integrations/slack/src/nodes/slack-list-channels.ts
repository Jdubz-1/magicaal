import type { NodeModule, ExecutionContext } from '@magicaal/sdk-node';
import { IntegrationError, collectAll } from '@magicaal/integration-core';
import { resolveToken, slackCall } from '../client';

interface SlackListChannelsConfig {
  connectionId: string;
  types?: string;
  maxChannels?: number;
  outputKey: string;
}

interface SlackChannel {
  id: string;
  name: string;
  is_private: boolean;
  is_archived: boolean;
  num_members?: number;
}

export const slackListChannels: NodeModule<SlackListChannelsConfig> = {
  type: 'integration:slack:list-channels',
  meta: {
    name: 'Slack: List Channels',
    description:
      'Lists channels via conversations.list with cursor pagination. Writes an array of {id, name, is_private, is_archived, num_members} to outputKey.',
    category: 'integration',
    icon: 'list',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'outputKey'],
      properties: {
        connectionId: {
          type: 'string',
          format: 'connection',
          service: 'slack',
          description: 'Slack Integration Connection to authenticate with',
        },
        types: {
          type: 'string',
          description:
            'Comma-separated channel types: public_channel, private_channel, mpim, im (default: public_channel)',
        },
        maxChannels: {
          type: 'number',
          description: 'Maximum channels to return (default: 1000)',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write the channel array to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        channels: { type: 'array' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: SlackListChannelsConfig) {
    try {
      const token = resolveToken(ctx, config.connectionId);

      const channels = await collectAll<SlackChannel, string>(
        async (cursor) => {
          const body = await slackCall(token, 'conversations.list', {
            types: config.types ?? 'public_channel',
            limit: 200,
            ...(cursor ? { cursor } : {}),
          });
          const meta = body.response_metadata as { next_cursor?: string } | undefined;
          const next = meta?.next_cursor;
          return {
            items: (body.channels as SlackChannel[]) ?? [],
            nextCursor: next && next.length > 0 ? next : null,
          };
        },
        { maxItems: config.maxChannels ?? 1000 },
      );

      const result = channels.map((c) => ({
        id: c.id,
        name: c.name,
        is_private: c.is_private,
        is_archived: c.is_archived,
        num_members: c.num_members,
      }));

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
