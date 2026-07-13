import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/tests/setup.ts'],
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@magicaal/nodes$': '<rootDir>/../../packages/nodes/src/index.ts',
    '^@magicaal/sdk-node$': '<rootDir>/../../packages/sdk/src/index.ts',
    '^@magicaal/integration-core$': '<rootDir>/../../packages/integrations/core/src/index.ts',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
    // Drizzle table declarations. Their only "functions" are foreign-key arrows
    // (`() => tenants.id`) that Drizzle alone invokes — covering them would mean
    // testing Drizzle, not this codebase.
    '!src/db/schema/**',
  ],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  coverageThreshold: {
    global: {
      lines: 80,
      branches: 80,
      functions: 80,
      statements: 80,
    },
  },
};

export default config;
