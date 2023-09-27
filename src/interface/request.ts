/*
 * @Author: liaokt
 * @Description: 请求接口
 * @Date: 2023-09-27 11:05:45
 * @LastEditors: liaokt
 * @LastEditTime: 2023-09-27 11:13:13
 */

/**
 * 普通数据响应
 */
export interface IResponseData<T> {
  /** 状态码 */
  code: number;
  /** 响应信息 */
  message: string;
  /** 响应内容体 */
  data: T;
  /** 接口返回是否成功 */
  success: boolean;
}
