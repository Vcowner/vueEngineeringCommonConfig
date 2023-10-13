/*
 * @Author: liaokt
 * @Description: createUpdateEffect 类似于 useEffect 但是初次不执行
 * @Date: 2023-10-08 10:27:15
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-08 10:45:40
 */
import { onMounted, ref, watch, watchEffect } from "vue";

type EffectHookType = typeof watchEffect | typeof watch;

// 导出一个函数，用于创建更新效果
export const createUpdateEffect: (hook: EffectHookType) => EffectHookType = hook => (effect, deps) => {
  // 创建一个布尔值，用于标记是否已经挂载
  const isMounted = ref(false);

  // 挂载时，将布尔值设置为true
  onMounted(() => {
    isMounted.value = true;
  });

  // 返回一个hook，用于更新
  return hook(() => {
    // 如果已经挂载，则执行effect，并传入onCleanup函数
    if (isMounted.value) {
      return effect(onCleanup);
    }
  }, deps as any);
};

// 创建一个清理函数
const onCleanup = () => {
  console.log("Cleaning up");
};

// 导出函数
export default createUpdateEffect;
