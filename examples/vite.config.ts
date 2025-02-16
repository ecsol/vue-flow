import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueTypes from 'vite-plugin-vue-type-imports'
import AutoImport from 'unplugin-auto-import/vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  resolve: {
    dedupe: ['vue'],
    alias: {
      '~': resolve('../package/src'),
    },
  },
  plugins: [
    vue({
      reactivityTransform: './src/',
    }),
    vueTypes(),
    svgLoader(),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'vue/macros'],
      dts: resolve('src/auto-imports.d.ts'),
    }),
  ],
  optimizeDeps: {
    include: ['@braks/vue-flow'],
  },
})
