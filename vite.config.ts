/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  test: {
    globals: true
  },
  build: {
    sourcemap: true,
    outDir: './dist',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts')
      },
      formats: ['cjs', 'es']
    }
  },
  plugins: [
    dts({
      entryRoot: 'src',
      exclude: ['**/tests/**']
    })
  ]
})
