<template>
  <div
    ref="echartsRef"
    :style="{ width: '100%', margin: '0 auto', height: '500px' }"
  ></div>
</template>
<script setup lang="ts" name="ComEcharts">
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
  console.log(3234);
  chart.resize();
}, 300);

const getEchartsInfo = () => {
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
// 无法清除
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
<style lang="scss" scoped></style>
