<template>
  <div
    ref="echartsRef"
    :style="{ width: '100%', margin: '0 auto', height: '500px' }"
  ></div>
</template>
<script setup lang="ts" name="ComEcharts">
import { onBeforeRouteLeave } from "vue-router";
import debound from "lodash/debounce";
import echarts from "@/utils/echarts";

interface Props {
  echartsHight?: string | number;
  echartsInfo?: {
    [key in string]: any;
  };
}
const props = withDefaults(defineProps<Props>(), {
  echartsHight: 500,
  // echartsInfo: {},
});
let chart = reactive<any>({});
const echartsRef = ref<any>(null);
const handleResize = debound(() => {
  chart.resize();
}, 300);

const getEchartsInfo = () => {
  // 先打开，然后调整窗口大小，再打开会变成默认100px（使用v-if）
  nextTick(() => {
    chart = echarts.init(echartsRef.value);
    const options = props.echartsInfo;
    options && chart.setOption(options);
  });
  window.addEventListener("resize", handleResize);
};
watch(
  () => props.echartsInfo,
  () => {
    getEchartsInfo();
  },
  { deep: true }
);
onMounted(() => {
  getEchartsInfo();
});
// 销毁事件
onBeforeRouteLeave((to, from, next) => {
  window.removeEventListener("resize", handleResize);
  next();
});
// 无法清除
// onUnmounted(() => {
//   window.removeEventListener("resize", handleResize);
// });
</script>
<style lang="scss" scoped></style>
