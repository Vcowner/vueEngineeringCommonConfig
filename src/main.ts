/*
 * @Author: liaokt
 * @Description: 入口文件
 * @Date: 2023-09-21 10:29:49
 * @LastEditors: liaokt
 * @LastEditTime: 2023-09-27 09:46:22
 */
import { createApp } from "vue";
import App from "./App.vue";
import pinia from "@/store";
import router from "@/router";
import "normalize.css";
import "@/styles/reset.css";

const app = createApp(App);

// 注册 pinia
app.use(pinia);
// 注册 router
app.use(router);

app.mount("#app");
