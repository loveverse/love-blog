<template>
  <el-container class="layout_wrapper">
    <el-header>
      <ComHeader></ComHeader>
    </el-header>
    <!-- 直接使用router-view不显示,不需要padding的在meta定义inter为true -->
    <el-main :class="$route.meta.inter && 'interval'">
      <router-view v-slot="{ Component }">
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
  .interval {
    padding: 0;
  }
  .el-main {
    @include scroll-default;
    @include tranition;
  }
  // .el-main {
  //   padding: 0;
  //   .interval {
  //     // height: 100%;
  //     padding: 20px;
  //     box-sizing: border-box;
  //   }
  // }
  // .el-footer {
  //   padding: 0;
  //   background-color: antiquewhite;
  // }
}
</style>
