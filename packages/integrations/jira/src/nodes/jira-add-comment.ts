import type { NodeModule, ExecutionContext } from '@magicaal/sdk-node';
import { IntegrationError, resolveField } from '@magicaal/integration-core';
import { resolveAuth, jiraCall, textToAdf } from '../client';

interface JiraAddCommentConfig {
  connectionId: string;
  issueKey: string;
  body: string;
  outputKey: string;
}

export const jiraAddComment: NodeModule<JiraAddCommentConfig> = {
  type: 'integration:jira:add-comment',
  meta: {
    name: 'Jira: Add Comment',
    description: 'Comments on a Jira issue. Writes {id} to outputKey.',
    category: 'integration',
    icon: 'message-circle',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'issueKey', 'body', 'outputKey'],
      properties: {
        connectionId: {
          type: 'string',
          format: 'connection',
          service: 'jira',
          description: 'Jira Integration Connection to authenticate with',
        },
        issueKey: {
          type: 'string',
          description: 'Issue key (e.g. ENG-123). Supports JSONata expressions starting with $.',
        },
        body: {
          type: 'string',
          description: 'Comment text. Supports JSONata expressions.',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write {id} to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: JiraAddCommentConfig) {
    try {
      const auth = resolveAuth(ctx, config.connectionId);
      const issueKey = await resolveField(ctx, config.issueKey);
      const body = await resolveField(ctx, config.body);

      const data = (await jiraCall(auth, 'POST', `/rest/api/3/issue/${issueKey}/comment`, {
        body: textToAdf(body),
      })) as { id: string };

      const result = { id: data.id };
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
            code: err.code ?? 'JIRA_ERROR',
            message: err.message,
            retryable: err.retryable,
          },
        };
      }
      throw err;
    }
  },
};
