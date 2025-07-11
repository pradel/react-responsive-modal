import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.tsx',
  format: ['esm', 'cjs'],
  platform: 'browser',
  exports: true,
  sourcemap: true,
  publint: true,
});
