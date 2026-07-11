import type { IntegrationPackage } from '@magicaal/sdk-node';
import { githubCreateIssue } from './nodes/github-create-issue';
import { githubAddComment } from './nodes/github-add-comment';
import { githubListIssues } from './nodes/github-list-issues';
import { githubTrigger } from './trigger';

export { githubCreateIssue, githubAddComment, githubListIssues, githubTrigger };
export { verifyGithubSignature } from './trigger';

export const GITHUB_INTEGRATION: IntegrationPackage = {
  service: 'github',
  displayName: 'GitHub',
  description:
    'Create issues, comment on issues and pull requests, and trigger agents from repository webhook events.',
  version: '0.1.0',
  authType: 'api_key',
  authSchema: {
    fields: [
      {
        key: 'token',
        label: 'Personal Access Token',
        type: 'secret',
        required: true,
        description: 'Fine-grained or classic PAT with repo/issues scopes',
      },
    ],
  },
  nodes: [githubCreateIssue, githubAddComment, githubListIssues],
  trigger: githubTrigger,
};
