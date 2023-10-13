/*
 * @Author: liaokt
 * @Description: useUpdateEffect 类似于 useEffect 但是初次不执行
 * @Date: 2023-10-08 10:43:56
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-08 10:45:33
 */

// 导入 watchEffect 方法
import { watchEffect } from "vue";
// 导入 createUpdateEffect 方法
import { createUpdateEffect } from "../createUpdateEffect";

// 导出 watchEffect 方法
export default createUpdateEffect(watchEffect);
