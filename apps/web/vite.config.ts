/* eslint-disable import/no-default-export */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import * as path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.VITE_PORT) || 3000,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    // https://github.com/sapphi-red/vite-plugin-static-copy
    // TODO: library is probably not typed correctly...
    // @ts-ignore
    viteStaticCopy({
      // Note: we can't reference node_modules because Turbo optimizes node_modules - and packages work the same way
      targets: [
        {
          src: '../../packages/ui-library/dist/images/*',
          dest: 'images',
        },
        {
          src: '../../packages/ui-library/dist/fonts/*',
          dest: 'fonts',
        },
      ],
    }),
  ],
})
