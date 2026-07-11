import type { IntegrationPackage } from '@magicaal/sdk-node';
import { jiraCreateIssue } from './nodes/jira-create-issue';
import { jiraAddComment } from './nodes/jira-add-comment';
import { jiraTrigger } from './trigger';

export { jiraCreateIssue, jiraAddComment, jiraTrigger };
export { verifyJiraSignature } from './trigger';

export const JIRA_INTEGRATION: IntegrationPackage = {
  service: 'jira',
  displayName: 'Jira',
  description:
    'Create issues, add comments, and trigger agents from Jira webhook events.',
  version: '0.1.0',
  authType: 'api_key',
  authSchema: {
    fields: [
      {
        key: 'base_url',
        label: 'Site URL',
        type: 'string',
        required: true,
        description: 'e.g. https://your-org.atlassian.net',
      },
      {
        key: 'email',
        label: 'Account Email',
        type: 'string',
        required: true,
        description: 'Atlassian account email for Basic auth',
      },
      {
        key: 'api_token',
        label: 'API Token',
        type: 'secret',
        required: true,
        description: 'From id.atlassian.com → Security → API tokens',
      },
    ],
  },
  nodes: [jiraCreateIssue, jiraAddComment],
  trigger: jiraTrigger,
};
