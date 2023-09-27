/*
 * @Author: liaokt
 * @Description: vite 配置
 * @Date: 2023-09-20 16:51:42
 * @LastEditors: liaokt
 * @LastEditTime: 2023-09-27 10:18:20
 */
import { defineConfig } from "vite";
// pnpm install @types/node --D
import { resolve } from "node:path";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import eslintPlugin from "vite-plugin-eslint";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 允许使用 Jsx
    vueJsx(),
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
  // css预处理器
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@import "@/assets/styles/common.less";'
      }
    }
  },
  // 设置代理
  server: {
    host: "0.0.0.0",
    port: 8000,
    open: true, // 自动在浏览器打开
    proxy: {
      "/api": {
        target: "http url",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, "")
      }
    }
  },
  // 打包配置
  build: {
    outDir: "build",
    // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
    // minify: "esbuild",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // 禁用 gzip 压缩大小报告，可略微减少打包时间
    target: ["es2015"],
    cssTarget: ["chrome68"],
    reportCompressedSize: false,
    // 规定触发警告的 chunk 大小
    chunkSizeWarningLimit: 1500,
    //生成静态资源的存放路径
    assetsDir: "assets",
    rollupOptions: {
      output: {
        // Static resource classification and packaging
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "[ext]/[name]-[hash].[ext]"
      },
      manualChunks: {
        vendors: []
      }
    }
  }
});
