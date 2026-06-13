import { codecovVitePlugin } from '@codecov/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  plugins: [
    react(),
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: 'react-responsive-modal',
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
  pack: {
    entry: ['src/index.tsx'],
    platform: 'browser',
    format: ['cjs', 'esm'],
    exports: {
      customExports(pkg) {
        pkg['./styles.css'] = './styles.css';
        return pkg;
      },
    },
    sourcemap: true,
    dts: true,
    clean: true,
    publint: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './__tests__/setup.ts',
    coverage: {
      provider: 'istanbul',
    },
  },
});
