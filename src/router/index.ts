/*
 * @Author: liaokt
 * @Description: 路由配置
 * @Date: 2023-09-21 11:26:03
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-08 10:55:01
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/login/index.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
