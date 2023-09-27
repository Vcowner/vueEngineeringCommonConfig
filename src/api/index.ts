/*
 * @Author: liaokt
 * @Description: 封装 axios
 * @Date: 2023-09-27 11:23:14
 * @LastEditors: liaokt
 * @LastEditTime: 2023-09-27 11:27:36
 */
import { IResponseData } from "@/interface/request";
import { axios } from "./request";

export const useRequest = new (class {
  loginApi: string;

  constructor() {
    // 请求接口路径
    this.loginApi = "/login/login";
  }

  Login(data: Object) {
    return axios<IResponseData<typeof data>>({ url: this.loginApi, data, method: "post" });
  }
})();
