/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react-swc"
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 0
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      // enabled: true,
      provider: 'v8',
      clean: true,
      all: true,
      reporter: ['html', 'json', 'text'],
      exclude: [
        '**/*/index.ts',
        'src/**/*.d.ts',
        '**/__mocks__/**'
      ],
      include: [
        'src/**/components',
        'src/**/features',
        'src/**/helpers',
        'src/**/utils',
        'src/**/hooks',
        'src/**/store'
      ]
    }
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@api': path.resolve(__dirname, './src/api'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@components': path.resolve(__dirname, './src/components'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
      '@store': path.resolve(__dirname, './src/store'),
    }
  },
  server: {
    port: 3000
  }
});
