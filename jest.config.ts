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
    '^@utils/(.*)$': '<rootDir>/app/_utils/$1',
    '^@store/(.*)$': '<rootDir>/app/_store/$1',
    '^@components/(.*)$': '<rootDir>/app/_components/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/app/setupTests.ts'],
  transformIgnorePatterns: ['/node_modules/(?!(\\.pnpm|chalk))']
};

export default createJestConfig(config);
