/*
 * @Author: liaokt
 * @Description: pinia 根仓库文件
 * @Date: 2023-09-21 11:09:49
 * @LastEditors: liaokt
 * @LastEditTime: 2023-09-22 11:16:38
 */
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";

const pinia = createPinia();
pinia.use(piniaPluginPersist);

export default pinia;
