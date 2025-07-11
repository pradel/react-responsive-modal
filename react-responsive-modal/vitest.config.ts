import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { codecovVitePlugin } from '@codecov/vite-plugin';

export default defineConfig({
  plugins: [
    react(),
    // Must be at the end of the list
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: 'react-responsive-modal',
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './__tests__/setup.ts',
    coverage: {
      provider: 'istanbul',
    },
  },
});
