import base from '@ats/config/eslint/base.mjs';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  ...base,
  {
    ignores: ['next-env.d.ts', '.next/**'],
  },
  {
    // Build-time asset scripts run in Node but evaluate snippets inside a
    // headless browser, so they legitimately reference browser globals.
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: { document: 'readonly' },
    },
  },
  {
    plugins: { react, 'react-hooks': reactHooks },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
    settings: { react: { version: 'detect' } },
  },
];
