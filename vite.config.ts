import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    sortImports: true,
    printWidth: 80,
    singleQuote: true,
    ignorePatterns: [
      '**/dist/**',
      'react-responsive-modal/CHANGELOG.md',
      'website/.next/**',
    ],
  },
  lint: {
    options: { typeAware: true, typeCheck: true },
    plugins: ['node', 'typescript', 'vitest'],
    rules: {
      'vitest/require-mock-type-parameters': 'off',
      'typescript/triple-slash-reference': 'off',
    },
  },
  run: {
    cache: true,
  },
});
