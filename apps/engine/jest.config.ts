import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  // Each route test spins up a real better-sqlite3 primary DB (migrated from
  // apps/api's SQL) plus a full createApp() boot. Under coverage
  // instrumentation, running many of those in parallel exhausts memory —
  // cap workers rather than letting Jest default to one per core.
  maxWorkers: 2,
  setupFiles: ['<rootDir>/tests/setup.ts'],
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    // @magicaal/compiler's source uses ESM '.js' specifiers, which Jest's CJS
    // resolver cannot follow. Same rule packages/cli's config already carries.
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@magicaal/nodes$': '<rootDir>/../../packages/nodes/src/index.ts',
    // Test-only: the Caal suite compiles agents/caal.agent.ts in-process. The
    // package's `main` points at gitignored dist/, so resolve it from source
    // exactly as packages/cli's jest config already does.
    '^@magicaal/compiler$': '<rootDir>/../../packages/compiler/src/index.ts',
    '^@magicaal/core$': '<rootDir>/../../packages/core/src/index.ts',
    '^@magicaal/sdk-node$': '<rootDir>/../../packages/sdk/src/index.ts',
    '^@magicaal/integration-core$': '<rootDir>/../../packages/integrations/core/src/index.ts',
    '^@magicaal/integration-caal$': '<rootDir>/../../packages/integrations/caal/src/index.ts',
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
    // tsconfig.test.json, not tsconfig.json: compiling agents/caal.agent.ts
    // needs experimentalDecorators for its @Agent decorator, which the runtime
    // tsconfig has no reason to carry.
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
  ],
  // A ratchet, not a target. These sit just under the measured floor so
  // coverage cannot regress, and they are raised whenever it rises. The Caal
  // simulated-run suite took the engine from 65.07% statements / 43.31%
  // branches to 73.70% / 53.28% by exercising the scheduler's worker, the tool
  // executor and the router through real runs rather than stubs.
  coverageThreshold: {
    global: {
      statements: 73,
      lines: 75,
      functions: 70,
      branches: 53,
    },
  },
};

export default config;
