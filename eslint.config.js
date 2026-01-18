import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import nxEslintPlugin from '@nx/eslint-plugin'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@nx': nxEslintPlugin,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['type:ui', 'type:hooks', 'type:i18n'],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:hooks', 'type:i18n'],
            },
            {
              sourceTag: 'type:hooks',
              onlyDependOnLibsWithTags: ['type:ui', 'type:i18n'],
            },
            {
              sourceTag: 'type:i18n',
              onlyDependOnLibsWithTags: [],
            },
          ],
        },
      ],
    },
  },
])
