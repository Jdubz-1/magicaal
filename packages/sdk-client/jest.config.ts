import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  moduleNameMapper: {
    // Source files use ESM-style .js suffixes; map back to .ts for ts-jest
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

export default config;
