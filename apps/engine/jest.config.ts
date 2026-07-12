import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/tests/setup.ts'],
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@magicaal/nodes$': '<rootDir>/../../packages/nodes/src/index.ts',
    '^@magicaal/core$': '<rootDir>/../../packages/core/src/index.ts',
    '^@magicaal/sdk-node$': '<rootDir>/../../packages/sdk/src/index.ts',
    '^@magicaal/integration-core$': '<rootDir>/../../packages/integrations/core/src/index.ts',
    '^@magicaal/integration-slack$': '<rootDir>/../../packages/integrations/slack/src/index.ts',
    '^@magicaal/integration-github$': '<rootDir>/../../packages/integrations/github/src/index.ts',
    '^@magicaal/integration-jira$': '<rootDir>/../../packages/integrations/jira/src/index.ts',
    '^@magicaal/integration-gmail$': '<rootDir>/../../packages/integrations/gmail/src/index.ts',
    '^@magicaal/integration-sendgrid$': '<rootDir>/../../packages/integrations/sendgrid/src/index.ts',
    '^@magicaal/integration-stripe$': '<rootDir>/../../packages/integrations/stripe/src/index.ts',
    '^@magicaal/integration-google-workspace$': '<rootDir>/../../packages/integrations/google-workspace/src/index.ts',
    '^@magicaal/integration-salesforce$': '<rootDir>/../../packages/integrations/salesforce/src/index.ts',
    '^@magicaal/integration-hubspot$': '<rootDir>/../../packages/integrations/hubspot/src/index.ts',
    '^@magicaal/integration-zendesk$': '<rootDir>/../../packages/integrations/zendesk/src/index.ts',
    '^@magicaal/integration-twilio$': '<rootDir>/../../packages/integrations/twilio/src/index.ts',
    '^@magicaal/integration-quickbooks$': '<rootDir>/../../packages/integrations/quickbooks/src/index.ts',
    '^@magicaal/integration-bamboohr$': '<rootDir>/../../packages/integrations/bamboohr/src/index.ts',
    '^@magicaal/integration-shopify$': '<rootDir>/../../packages/integrations/shopify/src/index.ts',
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
  ],
};

export default config;
