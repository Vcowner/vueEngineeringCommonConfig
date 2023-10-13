<!--
 * @Author: liaokt
 * @Description: 
 * @Date: 2023-09-22 10:31:28
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-08 15:01:13
-->
<template>
  <div>xxx</div>
</template>

<script lang="ts" setup>
import useUpdateEffect from "@/hooks/useUpdateEffect/index";

useUpdateEffect(() => {
  console.log("xxx", "useUpdateEffect");
}, [] as any);
</script>
