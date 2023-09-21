# vueEngineeringCommonConfig

前端工程化配置：vite4+vue3+ts+pinia+vue-router+axios+commit 规范+代码质量检验

## 目录

- store
  - 方式 pinia 相关状态
- directive
  - 自定义指令相关 v-auth
- http
  - 处理 axios 请求的封装和调用

## 依赖

- 设置自动导入

  - 1、安装
    `pnpm install unplugin-auto-import -D`
  - 2、在 vite.config.ts 中配置
    ```
    import AutoImport from 'unplugin-auto-import/vite'
        export default defineConfig({
            plugins: [...,AutoImport()],
        ...
        });
    ```

## 持久化数据

- 集成 web-storage-plus 持久化数据使用该插件

  - 基于 localStorage 做了一层封装，使其更易用、更简洁、更强大

  - 1、安装
    `pnpm install web-localstorage-plus`
  - 2、在 main.ts 中配置

  ```
  import createStorage from 'web-localstorage-plus'
  createStorage({
      rootName:'spp-storage'
  })
  ```

  - 3、在 .vue 中使用

  ```
  <script lang="ts" setup>
      import { useStorage } from 'web-localstorage-plus'

      const storage = useStorage()
      storage.setItem('user',{
      name:'spp',
      age:28
      })
  </script>
  ```

## 非持久化数据

- pinia
  - 对于非持久化数据，可以使用 pinia 来进行管理，它托管了全局状态并且提供了响应能力[传送门](https://pinia.web3doc.top/getting-started.html)。
  - 1、安装
  ```
   pnpm install pinia
  ```
