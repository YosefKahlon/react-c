import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@my-app/ui': path.resolve(__dirname, './libs/ui/src'),
      '@my-app/hooks': path.resolve(__dirname, './libs/hooks/src'),
      '@my-app/i18n': path.resolve(__dirname, './libs/i18n/src'),
    },
  },
})
