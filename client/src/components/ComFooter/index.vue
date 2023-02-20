<template>
  <div class="records">
    &copy; 2021&nbsp;
    <a href="https://beian.miit.gov.cn" target="_blank">鄂ICP备2021020610号</a>
  </div>
</template>
<script setup lang="ts" name="ComFooter"></script>
<style lang="scss" scoped>
.records {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 40px;
  color: #fff;
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      color: #ff404b;
      text-decoration: underline;
    }
  }
}
</style>
