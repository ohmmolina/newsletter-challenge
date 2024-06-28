// @ts-check

import eslint from '@eslint/js'
import prettierConfig from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    rules: {
      semi: 'off'
    }
  }
)
