import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.tsx',
  format: ['esm', 'cjs'],
  platform: 'browser',
  exports: {
    customExports(pkg) {
      pkg['./styles.css'] = './styles.css';
      return pkg;
    },
  },
  sourcemap: true,
  publint: true,
});
