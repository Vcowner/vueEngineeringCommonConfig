/*
 * @Author: liaokt
 * @Description: vite 配置
 * @Date: 2023-09-20 16:51:42
 * @LastEditors: liaokt
 * @LastEditTime: 2023-09-22 10:37:57
 */
import { defineConfig } from "vite";
// pnpm install @types/node --D
import { resolve } from "node:path";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import eslintPlugin from "vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 按需自动导入 elementPlus UI 组件库
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    eslintPlugin({
      include: ["src/**/*.ts", "src/**/*.vue", "src/*.ts", "src/*.vue"]
    })
  ],
  // 配置别名
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  // 设置代理
  server: {
    proxy: {
      "/api": {
        target: "http url",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, "")
      }
    }
  }
});
