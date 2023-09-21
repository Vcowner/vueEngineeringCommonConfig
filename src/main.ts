/*
 * @Author: liaokt
 * @Description: 入口文件
 * @Date: 2023-09-21 10:29:49
 * @LastEditors: liaokt
 * @LastEditTime: 2023-09-21 11:11:12
 */
import { createApp } from "vue";
import App from "./App.vue";
import createStorage from "web-localstorage-plus";
import pinia from "./store";
import "./style.css";

// 初始化根存储
createStorage({
  // 根命名空间
  rootName: "sp-storage",
});

const app = createApp(App);

// 注册 pinia

app.use(pinia);

app.mount("#app");
