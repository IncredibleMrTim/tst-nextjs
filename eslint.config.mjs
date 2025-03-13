import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'eslint-define-config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  ...compat.extends(
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    plugins: {
      react,
      '@typescript-eslint': typescriptEslint,
      prettier
    },

    files: ['**/*.ts', '**/*.tsx', '!**/node_modules/'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        dfd: 'readonly'
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    settings: {
      'import/resolver': {
        typescript: {}
      }
    },
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.{ts,tsx}',
            '**/__mocks__/*.{ts,tsx}',
            '**/src/setupTests.{ts,tsx}',
            'node_modules'
          ]
        }
      ],
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index']
          ],
          pathGroups: [
            {
              pattern: '**/**.{ts|tsx}',
              group: 'internal'
            },
            {
              pattern: '**/**.test.*',
              group: 'internal'
            }
          ],
          'newlines-between': 'always'
        }
      ],
      '@typescript-eslint/no-inferrable-types': 'off',
      'no-underscore-dangle': [
        'error',
        {
          allow: ['_id']
        }
      ],
      'react/jsx-props-no-spreading': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'prettier/prettier': 'warn',
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.tsx']
        }
      ],
      'import/prefer-default-export': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function'
        }
      ],
      '@typescript-eslint/no-empty-interface': [
        'error',
        {
          allowSingleExtends: true
        }
      ],
      'react/prop-types': 'off',
      'react/require-default-props': 'off',

      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      '@typescript-eslint/ban-ts-comment': 'off'
    }
  }
]);
