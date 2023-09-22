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

## 集成 vue-router4

- 1、安装
  `pnpm install vue-router@4 -D`

## 集成 less

- 1、安装
  `pnpm install less less-loader -D`

## 集成 element-plus

- 1、安装
  `pnpm install element-plus -D`
- 2、按需自动导入
  - 安装
    `pnpm install unplugin-vue-components unplugin-auto-import -D`
- 3、在 vite.config.ts 中配置

## 集成 axios

- 1、安装
  `pnpm install axios -D`

## 代码质量与提交规范

### eslint

- 1、安装
  `pnpm install eslint eslint-plugin-vue -D`
- 2、兼容 ts
  - 安装
    `pnpm install @typescript-eslint/parser @typescript-eslint/eslint-plugin -D`
- 3、按环境区分校验规则
  - 1）、安装
    `pnpm install cross-env @rollup/plugin-eslint -D`
  - 2）、修改命令行， 以 production 为例子
  ```
  "scripts": {
    ...
    "build": "cross-env NODE_ENV=production && vue-tsc --noEmit && vite build"
  },
  ```
  - 3）、将 rollup 插件加入 vite 的 plugin

### prettier

- 1、安装
  `pnpm install prettier eslint-config-prettier eslint-plugin-prettier -D`
- 2、配置文件 .prettierrc.js
- 3、修改 .eslintrc.js

### 提交规范

- 1、安装 husky
  `pnpm install husky -D`
- 2、初始化 husky, 并立即运行
  `"prepare": "husky install"`
- 3、注册 hook - 使用 pre-commit 钩子来拦截提交请求

  ```
  npx husky add .husky/pre-commit "npm run check"
  git add .husky/pre-commit

  ```

- git commit 提交时，会先执行 pre-commit 钩子，再执行 commit, check 脚本 是针对全部文件的，因此我们需要借助另一个 npm 包 帮我们把当前更改的文件提取出来单独校验
- 4、安装 lint-staged
  `pnpm install lint-staged -D`
  - 4.1、修改 package.json 配置
  ```
  "lint-staged": {
    "*.{js,ts,vue}": [
      "npm run eslint",
      "prettier --parser=typescript --write"
    ]
  }
  ```
  - 4.2、与 husky 配合使用
  ```
  "scripts": {
    ...
    "check": "lint-staged"
  },
  ```
- 5、安装 commitlint 对 commit 提交进行约束
  `pnpm install @commitlint/cli @commitlint/config-conventional -D`

  - 5.1、将其校验文职放在 check 脚本执行前

  ```
  npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
  ```

  - 5.2、配置 commitlint.config.js
