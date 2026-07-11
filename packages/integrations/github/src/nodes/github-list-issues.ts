import type { NodeModule, ExecutionContext } from '@magicaal/sdk-node';
import {
  IntegrationError,
  resolveField,
  collectAll,
  parseLinkHeader,
} from '@magicaal/integration-core';
import { resolveToken, githubCall, GITHUB_API_BASE } from '../client';

interface GithubListIssuesConfig {
  connectionId: string;
  repo: string;
  state?: 'open' | 'closed' | 'all';
  labels?: string;
  maxIssues?: number;
  outputKey: string;
}

interface GithubIssue {
  number: number;
  title: string;
  state: string;
  html_url: string;
  user?: { login: string };
  labels?: Array<{ name: string }>;
  pull_request?: unknown;
}

export const githubListIssues: NodeModule<GithubListIssuesConfig> = {
  type: 'integration:github:list-issues',
  meta: {
    name: 'GitHub: List Issues',
    description:
      'Lists repository issues with Link-header pagination. Writes an array of {number, title, state, url, author, labels} to outputKey.',
    category: 'integration',
    icon: 'list',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'repo', 'outputKey'],
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
        state: {
          type: 'string',
          enum: ['open', 'closed', 'all'],
          description: 'Issue state filter (default: open)',
        },
        labels: {
          type: 'string',
          description: 'Comma-separated label filter',
        },
        maxIssues: {
          type: 'number',
          description: 'Maximum issues to return (default: 500)',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write the issue array to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        issues: { type: 'array' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: GithubListIssuesConfig) {
    try {
      const token = resolveToken(ctx, config.connectionId);
      const repo = await resolveField(ctx, config.repo);

      const params = new URLSearchParams({ state: config.state ?? 'open', per_page: '100' });
      if (config.labels) params.set('labels', config.labels);
      const firstPath = `/repos/${repo}/issues?${params.toString()}`;

      const issues = await collectAll<GithubIssue, string>(
        async (cursor) => {
          const path = cursor ?? firstPath;
          const { data, response } = await githubCall(token, 'GET', path);
          const rels = parseLinkHeader(response.headers.get('link'));
          const next = rels.next ? rels.next.replace(GITHUB_API_BASE, '') : null;
          return { items: (data as GithubIssue[]) ?? [], nextCursor: next };
        },
        { maxItems: config.maxIssues ?? 500 },
      );

      const result = issues
        .filter((i) => !i.pull_request) // the issues endpoint also returns PRs
        .map((i) => ({
          number: i.number,
          title: i.title,
          state: i.state,
          url: i.html_url,
          author: i.user?.login,
          labels: (i.labels ?? []).map((l) => l.name),
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
