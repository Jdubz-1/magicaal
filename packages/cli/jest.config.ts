import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // Resolve workspace packages from source, as apps/api and apps/engine do.
    // Their package.json `main` points at dist/, which is gitignored and not
    // built before these tests run on a fresh checkout — CI failed here with
    // "Cannot find module '@magicaal/compiler'" the first time cli tests ran.
    '^@magicaal/compiler$': '<rootDir>/../compiler/src/index.ts',
    '^@magicaal/nodes$': '<rootDir>/../nodes/src/index.ts',
    '^@magicaal/core$': '<rootDir>/../core/src/index.ts',
    '^@magicaal/sdk-node$': '<rootDir>/../sdk/src/index.ts',
  },
};

export default config;
