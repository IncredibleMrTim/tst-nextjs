import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './'
});

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {},
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

  moduleNameMapper: {
    // Lets jest.mock('@/...') resolve the same way imports do; mirrors tsconfig paths
    '^@/(.*)$': '<rootDir>/app/$1',
    '^@utils/(.*)$': '<rootDir>/app/_utils/$1',
    '^@store/(.*)$': '<rootDir>/app/_store/$1',
    '^@components/(.*)$': '<rootDir>/app/_components/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/app/setupTests.ts'],
  transformIgnorePatterns: ['/node_modules/(?!(\\.pnpm|chalk))']
};

const createConfig = createJestConfig(config);

// next/jest always ignores node_modules, so the override has to be applied
// after it resolves. @portabletext and @sanity ship ESM only and must be transformed.
export default async () => {
  const resolvedConfig = await createConfig();

  return {
    ...resolvedConfig,
    transformIgnorePatterns: [
      '/node_modules/(?!(\\.pnpm|chalk|@portabletext|@sanity)/)',
      '^.+\\.module\\.(css|sass|scss)$'
    ]
  };
};
