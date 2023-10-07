/*
 * @Author: liaokt
 * @Description: get 请求地址
 * @Date: 2023-10-07 09:22:47
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-07 09:36:57
 */

import { makeRequest } from "../request/request";

export default {
  "/500-error": makeRequest({
    url: "/500-error"
  }),
  /**
   * makeRequest 用于生成支持智能推导，路径替换，捕获错误的请求函数
   * 其形参的类型为 RequestConfig，该类型在继承 AxiosConfig 上加了自定义属性，例如存放路径参数的属性 args
   * makeRequest 带有四个可选泛型，分别为：
   * - Payload： 用于定义响应的数据类型， 若没有则可定义为 undefined，下面的变量也一样
   * - Data: 用于定义 data 的数据类型
   * - Params: 用于定义 params 的数据类型
   * - Args： 用于定义存放路径参数 args 的数据类型
   * */
  "/account/{username}": makeRequest<{ id: string; name: string; role: string }, undefined, undefined, { username: string }>({
    url: "/account/{username}"
  })
};
