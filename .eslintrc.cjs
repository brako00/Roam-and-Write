/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  'prettier/prettier': [
    'error',
    {
      endOfLine: 'auto'
    }
  ]
  // env: {
  //   'vitest-globals/env': true
  // }
}
