/*
 * @Author: liaokt
 * @Description:
 * @Date: 2023-09-21 14:28:19
 * @LastEditors: liaokt
 * @LastEditTime: 2023-09-21 14:31:03
 */
const mode = import.meta.env.MODE;

const urlConfig: any = {};

const getPrefix = (key: string) => {
  if (key === undefined) {
    key = "";
    return urlConfig[key][mode];
  }
  return urlConfig[key][mode];
};

export default getPrefix;
