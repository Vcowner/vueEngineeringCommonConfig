/*
 * @Author: liaokt
 * @Description:
 * @Date: 2023-10-07 14:55:52
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-07 15:31:20
 */
import axios from "axios";
import { handleAuthError, handleGeneralError, handleNetworkError, handleAuth } from "./tool";
import { FcResponse } from "@/interface/request";

type Fn = (data: FcResponse<any>) => unknown;

interface IAnyObj {
  [index: string]: unknown;
}

axios.interceptors.request.use(config => {
  // 处理配置
  config = handleAuth(config);
  return config;
});

axios.interceptors.response.use(
  response => {
    if (response.status !== 200) return Promise.reject(response.data);
    handleAuthError(response.data.code);
    handleGeneralError(response.data.code, response.data.message);
    return response;
  },
  err => {
    handleNetworkError(err.response.status);
    Promise.reject(err.response);
  }
);

export const Get = <T>(url: string, params?: IAnyObj, clearFn?: Fn): Promise<[any, FcResponse<T> | undefined]> =>
  new Promise(resolve => {
    axios
      .get(url, { params })
      .then(result => {
        let res: FcResponse<T>;
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as FcResponse<T>;
        } else {
          res = result.data as FcResponse<T>;
        }
        resolve([null, res as FcResponse<T>]);
      })
      .catch(err => {
        resolve([err, undefined]);
      });
  });

export const Post = <T>(url: string, data: IAnyObj, params: IAnyObj = {}): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise(resolve => {
    axios
      .post(url, data, { params })
      .then(result => {
        resolve([null, result.data as FcResponse<T>]);
      })
      .catch(err => {
        resolve([err, undefined]);
      });
  });
};
