import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/tests/setup.ts'],
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@magicaal/nodes$': '<rootDir>/../../packages/nodes/src/index.ts',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
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
