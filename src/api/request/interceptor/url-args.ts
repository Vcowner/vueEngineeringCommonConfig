/*
 * @Author: liaokt
 * @Description: 路径参数替换拦截器
 * @Date: 2023-09-28 15:11:40
 * @LastEditors: liaokt
 * @LastEditTime: 2023-09-28 15:18:55
 */
import { RequestConfig } from "@/interface/request";
import { AxiosRequestConfig } from "axios";

const urlArgsHandler = {
  request: {
    onFulfilled: (config: AxiosRequestConfig) => {
      const { url, args } = config as RequestConfig;
      // 检查 config 中是否有 args 属性， 没有则跳过以下代码逻辑
      if (args) {
        const lostParams: string[] = [];
        // 使用 String.prototype.replace 和正泽表达式进行匹配替换
        const replacedUrl = url!.replace(/\{([^}]+)\}/g, (res, arg: string) => {
          if (!args[arg]) {
            lostParams.push(arg);
          }
          return args[arg] as string;
        });
        // 如果 url 存在未替换的路径参数，则直接报错
        if (lostParams.length) {
          return Promise.reject(new Error("在args中找不到对应的路径参数"));
        }
        return { ...config, url: replacedUrl };
      }
      return config;
    }
  }
};

export default urlArgsHandler;
