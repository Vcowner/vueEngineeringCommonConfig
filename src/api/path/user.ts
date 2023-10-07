/*
 * @Author: liaokt
 * @Description: 用户相关请求
 * @Date: 2023-10-07 15:21:17
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-07 15:24:46
 */
import { Get } from "../server";
import { FcResponse } from "@/interface/request";

type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>;

// 获取用户信息
function getUserInfo<T extends { id: string; name: string }>(id: string): ApiResponse<T> {
  return Get<T>("/users/info", { userId: id });
}

export const userApi = {
  getUserInfo
};
