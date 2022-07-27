import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  css: {
    preprocessorOptions: {
      // 全局scss混入
      scss: {
        additionalData: `@use "src/style/public.scss" as *; @use "@/style/index.scss" as *;`
      }
    }
  },  // css 配置
  esbuild: {}, // 打包配置

  //  文件别名
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
      {
        find: 'eleicon',
        replacement: path.resolve(__dirname, 'node_modules/@element-plus/icons')
      }
    ]
  },
  plugins: [vue(), vueJsx()]
})
