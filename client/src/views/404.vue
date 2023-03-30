<template>
  <div class="error-page">
    <div class="error-code">4<span>0</span>4</div>
    <div class="error-desc">{{ t("notExit") }}</div>
    <div class="error-handle">
      <el-button type="" @click="toHome">{{ t("backHome") }}</el-button>
    </div>
  </div>
</template>
<script setup lang="ts" name="404">
import { t } from "@/lang";
const toHome = () => {
  window.location.href = window.origin;
};
</script>
<style lang="scss" scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  // background: #f3f3f3;
  box-sizing: border-box;
}

.error-code {
  line-height: 1;
  font-size: 250px;
  font-weight: bolder;
  color: #2d8cf0;
}

.error-code span {
  color: #00a854;
}

.error-desc {
  font-size: 30px;
  color: #777;
}

.error-handle {
  margin-top: 30px;
  // padding-bottom: 200px;
}

.error-btn {
  margin-left: 100px;
}
</style>
