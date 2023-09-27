/*
 * @Author: liaokt
 * @Description:  axios 配置
 * @Date: 2023-09-27 10:38:50
 * @LastEditors: liaokt
 * @LastEditTime: 2023-09-27 11:28:46
 */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// 创建请求实例
const service = axios.create({
  // 指定请求超时的毫秒数
  timeout: 6000,
  baseURL: import.meta.env.BASE_URL,
  // 表示跨域请求时是否需要使用凭证
  withCredentials: false
});

// 请求失败回调函数处理
const error = (error: { request: AxiosRequestConfig; response: AxiosResponse }) => {
  if (error.response.status === 401) {
    // 登陆状态过期或者未登陆
  }
  return Promise.reject(error);
};

// 请求前
service.interceptors.request.use((request: AxiosRequestConfig) => {
  return request;
}, error);

// 响应后
service.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, error);

export { service as axios };
