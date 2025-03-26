// filepath: /Users/timsmart/Documents/GitHub/Personal/tst/client/jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

  moduleNameMapper: {
    '^@utils/(.*)$': '<rootDir>/app/_utils/$1',
    '^@store/(.*)$': '<rootDir>/app/_store/$1',
    '^@components/(.*)$': '<rootDir>/app/_components/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/app/setupTests.ts']
};

export default config;
