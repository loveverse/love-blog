<template>
  <el-container class="layout_wrapper">
    <el-header>
      <ComHeader></ComHeader>
    </el-header>
    <el-main>
      <!-- 直接使用router-view不显示 -->
      <router-view v-slot="{ Component }">
        <transition name="move" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>

      <!-- <router-view> -->
      <!-- </router-view> -->
    </el-main>
  </el-container>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
.layout_wrapper {
  width: 100%;
  height: 100%;
}
</style>
