<template>
  <router-view v-slot="{ Component }">
    <transition name="move" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup name="ComLayout"></script>
