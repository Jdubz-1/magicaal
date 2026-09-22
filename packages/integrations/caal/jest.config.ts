import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  moduleNameMapper: {
    '^@magicaal/sdk-node$': '<rootDir>/../../sdk/src/index.ts',
    '^@magicaal/core$': '<rootDir>/../../core/src/index.ts',
  },
};

export default config;
