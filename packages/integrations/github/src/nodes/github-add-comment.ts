import type { NodeModule, ExecutionContext } from '@magicaal/sdk-node';
import { IntegrationError, resolveField } from '@magicaal/integration-core';
import { resolveToken, githubCall } from '../client';

interface GithubAddCommentConfig {
  connectionId: string;
  repo: string;
  issueNumber: string;
  body: string;
  outputKey: string;
}

export const githubAddComment: NodeModule<GithubAddCommentConfig> = {
  type: 'integration:github:add-comment',
  meta: {
    name: 'GitHub: Add Comment',
    description:
      'Comments on an issue or pull request. Writes {id, url} to outputKey.',
    category: 'integration',
    icon: 'message-circle',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'repo', 'issueNumber', 'body', 'outputKey'],
      properties: {
        connectionId: {
          type: 'string',
          format: 'connection',
          service: 'github',
          description: 'GitHub Integration Connection to authenticate with',
        },
        repo: {
          type: 'string',
          description: 'Repository as owner/name. Supports JSONata expressions starting with $.',
        },
        issueNumber: {
          type: 'string',
          description: 'Issue or PR number. Supports JSONata expressions starting with $.',
        },
        body: {
          type: 'string',
          description: 'Comment body (Markdown). Supports JSONata expressions.',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write {id, url} to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        url: { type: 'string' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: GithubAddCommentConfig) {
    try {
      const token = resolveToken(ctx, config.connectionId);
      const repo = await resolveField(ctx, config.repo);
      const issueNumber = await resolveField(ctx, config.issueNumber);
      const body = await resolveField(ctx, config.body);

      const { data } = await githubCall(
        token,
        'POST',
        `/repos/${repo}/issues/${issueNumber}/comments`,
        { body },
      );

      const comment = data as { id: number; html_url: string };
      const result = { id: comment.id, url: comment.html_url };
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
            code: err.code ?? 'GITHUB_ERROR',
            message: err.message,
            retryable: err.retryable,
          },
        };
      }
      throw err;
    }
  },
};
