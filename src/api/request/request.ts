/*
 * @Author: liaokt
 * @Description:  axios 配置
 * @Date: 2023-09-27 10:38:50
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-07 16:59:39
 */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { MakeRequest, RequestConfig } from "@/interface/request";
import urlArgsHandler from "./interceptor/url-args";

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
service.interceptors.request.use(urlArgsHandler.request.onFulfilled, error);

// 响应后
service.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, error);

// makeRequest
const makeRequest: MakeRequest = <T>(config: RequestConfig) => {
  return async (requestConfig?: Partial<RequestConfig>) => {
    // 合并在 service 中定义的 config 和调用时从外部传入的 config
    const mergedConfig: RequestConfig = {
      ...config,
      ...requestConfig,
      headers: {
        ...config.headers,
        ...(requestConfig?.headers || {})
      }
    };

    // 统一处理返回类型
    try {
      const response: AxiosResponse<T, RequestConfig> = await service.request<T>(mergedConfig);
      const { data } = response;
      return { error: null, data, response };
    } catch (error) {
      return { error: error as Error, data: null, response: null };
    }
  };
};

export { makeRequest, axios };
