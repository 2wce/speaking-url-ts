// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'speaking-url-ts',
      // the proper extensions will be added
      fileName: 'index',
      formats: ['es', 'cjs']
    }
  }
})
