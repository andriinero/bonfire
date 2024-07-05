import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    open: true,
    port: 5174,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true,
    coverage: {
      provider: 'v8',
      exclude: [
        'src/types/*',
        'src/MainTheme.ts',
        'src/main.tsx',
        'tailwind.config.cjs',
        'postcss.config.cjs',
        '.eslintrc.cjs',
        'src/styled.d.ts',
        'src/app',
        'src/hooks',
      ],
    },
  },
});
