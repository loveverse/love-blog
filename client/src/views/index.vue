<template>
  <el-container class="layout_wrapper">
    <el-header>
      <ComHeader></ComHeader>
    </el-header>
    <!-- 直接使用router-view不显示,不需要padding的在meta定义inter为true -->

    <el-main :class="$route.meta.inter && 'interval'" id="main">
      <router-view v-slot="{ Component }">
        <transition name="move" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </el-main>

    <el-footer height="40px">
      <ComFooter />
    </el-footer>
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
  .el-header {
    box-shadow: 0px 2px 5px 0px #ddd;
    z-index: 99;
  }
  .el-main {
    @include scroll-default;
    @include tranition;
  }
  .el-footer {
    background-color: #99ccff;
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
