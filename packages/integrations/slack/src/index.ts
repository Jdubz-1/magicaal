import type { IntegrationPackage } from '@magicaal/sdk-node';
import { slackPostMessage } from './nodes/slack-post-message';
import { slackListChannels } from './nodes/slack-list-channels';
import { slackTrigger } from './trigger';

export { slackPostMessage, slackListChannels, slackTrigger };
export { verifySlackSignature } from './trigger';

export const SLACK_INTEGRATION: IntegrationPackage = {
  service: 'slack',
  displayName: 'Slack',
  description: 'Post messages, inspect channels, and trigger agents from Slack Events API events.',
  version: '0.1.0',
  authType: 'oauth2',
  authSchema: {
    fields: [
      {
        key: 'bot_token',
        label: 'Bot User OAuth Token',
        type: 'secret',
        required: true,
        description: 'xoxb- token from the Slack app OAuth & Permissions page',
      },
      {
        key: 'signing_secret',
        label: 'Signing Secret',
        type: 'secret',
        description: 'Required only when using Slack event triggers',
      },
    ],
    oauth: {
      authorizationUrl: 'https://slack.com/oauth/v2/authorize',
      tokenUrl: 'https://slack.com/api/oauth.v2.access',
      scopes: ['chat:write', 'channels:read'],
    },
  },
  nodes: [slackPostMessage, slackListChannels],
  trigger: slackTrigger,
};
