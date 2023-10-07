/*
 * @Author: liaokt
 * @Description: 请求接口
 * @Date: 2023-09-27 11:05:45
 * @LastEditors: liaokt
 * @LastEditTime: 2023-09-28 15:05:00
 * @remark 参考
 *  1、https://juejin.cn/post/7173670666326474783?from=search-suggest
 *  2、https://juejin.cn/post/7124573626161954823?searchId=20230927113449220C1E19FBF6A5B15362
 */

import { AxiosRequestConfig } from "axios";
import { config } from "process";

/**
 * 普通数据响应
 */
export interface IResponseData<T = any> {
  /** 状态码 */
  code: number;
  /** 响应信息 */
  message: string;
  /** 响应内容体 */
  data: T | null;
  /** 接口返回是否成功 */
  success: boolean;
}

/**
 * 重新定义 RequestConfig, 在 AxiosRequestConfig 基础上再加上 args 数据
 */
export interface RequestConfig extends AxiosRequestConfig {
  args?: Record<string, any>;
}

/**
 * 允许定义四个可选的泛型参数：
 *    Payload: 用于定义响应结果的数据类型
 *    Data：用于定义data的数据类型
 *    Params：用于定义parmas的数据类型
 *    Args：用于定义存放路径参数的属性args的数据类型
 */
// 这里的定义中重点处理上述四个泛型在缺省和定义下的四种不同情况
export interface MakeRequest {
  // identity<T>(arg: T): T 参考格式

  // Partial<T>: 将 T 中的所有属性变成可选的
  // Omit<T, K>: 从类型 T 中剔除 K 中的所有属性

  // 1、定义响应结果的数据类型，config -- 传递类型， requestConfig -- 参数类型 Promise -- 返回结果类型
  <Payload = any>(config: RequestConfig): (requestConfig?: Partial<RequestConfig>) => Promise<IResponseData<Payload>>;

  // 2、定义响应结果、data 的数据类型
  <Payload = any, Data = any>(
    config: RequestConfig
  ): (requestConfig: Partial<Omit<RequestConfig, "data">> & { data: Data }) => Promise<IResponseData<Payload>>;

  // 3、定义响应结果、data、params 的数据类型，判断是否缺省
  <Payload = any, Data = any, Params = any>(
    config: RequestConfig
  ): (
    requestConfig: Partial<Omit<RequestConfig, "data" | "params">> &
      (Data extends undefined ? { data?: undefined } : { data: Data }) & { params: Params }
  ) => Promise<IResponseData<Payload>>;

  // 4、定义响应结果、data、params、Args 的数据类型, 判断是否缺省
  <Payload = any, Data = any, Params = any, Args = any>(
    config: RequestConfig
  ): (
    requestConfig: Partial<Omit<RequestConfig, "data" | "params" | "args">> &
      (Data extends undefined ? { data?: undefined } : { data: Data }) &
      Params extends undefined
      ? { params?: undefined }
      : { params: Params } & { args: Args }
  ) => Promise<IResponseData<Payload>>;
}
