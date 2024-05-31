import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
      exclude: [
        'src/main.jsx',
        '.eslintrc.cjs',
        'src/App.jsx',
        'src/components/authorized/index.js',
        'src/components/toast/index.js',
        'src/pages/index.js',
        'src/store/slices/tokenSlice.js',
      ],
    },
  },
});
