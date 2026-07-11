import type { NodeModule, ExecutionContext } from '@magicaal/sdk-node';
import { IntegrationError, resolveField } from '@magicaal/integration-core';
import { resolveAuth, jiraCall, textToAdf } from '../client';

interface JiraCreateIssueConfig {
  connectionId: string;
  projectKey: string;
  issueType?: string;
  summary: string;
  description?: string;
  outputKey: string;
}

export const jiraCreateIssue: NodeModule<JiraCreateIssueConfig> = {
  type: 'integration:jira:create-issue',
  meta: {
    name: 'Jira: Create Issue',
    description:
      'Creates an issue in a Jira project. Writes {key, id, url} to outputKey.',
    category: 'integration',
    icon: 'clipboard',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'projectKey', 'summary', 'outputKey'],
      properties: {
        connectionId: {
          type: 'string',
          format: 'connection',
          service: 'jira',
          description: 'Jira Integration Connection to authenticate with',
        },
        projectKey: {
          type: 'string',
          description: 'Project key (e.g. ENG). Supports JSONata expressions starting with $.',
        },
        issueType: {
          type: 'string',
          description: 'Issue type name (default: Task)',
        },
        summary: {
          type: 'string',
          description: 'Issue summary. Supports JSONata expressions starting with $.',
        },
        description: {
          type: 'string',
          description: 'Issue description (plain text). Supports JSONata expressions.',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write {key, id, url} to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        key: { type: 'string' },
        url: { type: 'string' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: JiraCreateIssueConfig) {
    try {
      const auth = resolveAuth(ctx, config.connectionId);
      const projectKey = await resolveField(ctx, config.projectKey);
      const summary = await resolveField(ctx, config.summary);
      const description =
        config.description !== undefined ? await resolveField(ctx, config.description) : undefined;

      const fields: Record<string, unknown> = {
        project: { key: projectKey },
        issuetype: { name: config.issueType ?? 'Task' },
        summary,
      };
      if (description !== undefined) fields.description = textToAdf(description);

      const data = (await jiraCall(auth, 'POST', '/rest/api/3/issue', { fields })) as {
        id: string;
        key: string;
      };

      const result = {
        key: data.key,
        id: data.id,
        url: `${auth.baseUrl}/browse/${data.key}`,
      };
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
