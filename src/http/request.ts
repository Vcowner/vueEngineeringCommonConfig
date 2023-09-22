/*
 * @Author: liaokt
 * @Description: 配置 axios，并通过拦截器对接口状态进行检测和错误的统一处理
 * @Date: 2023-09-21 14:20:27
 * @LastEditors: liaokt
 * @LastEditTime: 2023-09-21 14:27:02
 */
import axios from "axios";

// 设置默认超时时间
axios.defaults.timeout = 100000;
// 设置可以发送凭据，用于校验用户身份
axios.defaults.withCredentials = true;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers = Object.assign(config.headers, {
      // 配置 header
    });
    return config;
  },
  error => {
    // 处理错误
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 统一拦截验证
    return response;
  },
  error => {
    // 处理错误
    return Promise.reject(error);
  }
);
