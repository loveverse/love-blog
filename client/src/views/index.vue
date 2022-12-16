<template>
  <el-container class="layout_wrapper">
    <el-header>
      <ComHeader></ComHeader>
    </el-header>
    <el-main>
      <!-- 直接使用router-view不显示,不需要padding的在meta定义isInter为false -->
      <router-view
        v-slot="{ Component }"
        :class="!$route.meta.isInter && 'interval'"
      >
        <transition name="move" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </el-main>
    <!-- <ComFooter /> -->
  </el-container>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
.layout_wrapper {
  width: 100%;
  height: 100%;
  .el-main {
    padding: 0;
    .interval {
      // height: 100%;
      padding: 20px;
      box-sizing: border-box;
    }
  }
  // .el-footer {
  //   padding: 0;
  //   background-color: antiquewhite;
  // }
}
</style>
