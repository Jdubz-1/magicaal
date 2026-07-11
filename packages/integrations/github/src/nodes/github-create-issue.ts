import type { NodeModule, ExecutionContext } from '@magicaal/sdk-node';
import { IntegrationError, resolveField } from '@magicaal/integration-core';
import { resolveToken, githubCall } from '../client';

interface GithubCreateIssueConfig {
  connectionId: string;
  repo: string;
  title: string;
  body?: string;
  labels?: string[];
  outputKey: string;
}

export const githubCreateIssue: NodeModule<GithubCreateIssueConfig> = {
  type: 'integration:github:create-issue',
  meta: {
    name: 'GitHub: Create Issue',
    description:
      'Creates an issue in a repository. Writes {number, url, id} to outputKey.',
    category: 'integration',
    icon: 'alert-circle',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'repo', 'title', 'outputKey'],
      properties: {
        connectionId: {
          type: 'string',
          format: 'connection',
          service: 'github',
          description: 'GitHub Integration Connection to authenticate with',
        },
        repo: {
          type: 'string',
          description: 'Repository as owner/name (e.g. acme/api). Supports JSONata expressions starting with $.',
        },
        title: {
          type: 'string',
          description: 'Issue title. Supports JSONata expressions starting with $.',
        },
        body: {
          type: 'string',
          description: 'Issue body (Markdown). Supports JSONata expressions.',
        },
        labels: {
          type: 'array',
          items: { type: 'string' },
          description: 'Labels to apply',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write {number, url, id} to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        number: { type: 'number' },
        url: { type: 'string' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: GithubCreateIssueConfig) {
    try {
      const token = resolveToken(ctx, config.connectionId);
      const repo = await resolveField(ctx, config.repo);
      const title = await resolveField(ctx, config.title);
      const body = config.body !== undefined ? await resolveField(ctx, config.body) : undefined;

      const { data } = await githubCall(token, 'POST', `/repos/${repo}/issues`, {
        title,
        ...(body !== undefined ? { body } : {}),
        ...(config.labels?.length ? { labels: config.labels } : {}),
      });

      const issue = data as { number: number; html_url: string; id: number };
      const result = { number: issue.number, url: issue.html_url, id: issue.id };
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
