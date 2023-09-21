/*
 * @Author: liaokt
 * @Description: vite 配置
 * @Date: 2023-09-20 16:51:42
 * @LastEditors: liaokt
 * @LastEditTime: 2023-09-21 10:50:55
 */
import { defineConfig } from "vite";
// pnpm install @types/node --D
import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 配置别名
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  // 设置代理
  server: {
    proxy: {
      "/api": {
        target: "http url",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
    },
  },
});
