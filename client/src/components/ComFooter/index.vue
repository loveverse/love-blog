<template>
  <div class="records">
    <span class="time">网站已风雨兼程运行了：{{ time }}</span>
    <el-tooltip
      class="box-item"
      effect="dark"
      content="鄂ICP备2021020610号"
      placement="top"
    >
      <span
        >&copy;2021<a href="https://beian.miit.gov.cn" target="_blank"
          >鄂ICP备2021020610号</a
        ></span
      >
    </el-tooltip>
  </div>
</template>
<script setup lang="ts" name="ComFooter">
import moment from "moment";
const time = computed(() => {
  const date = moment(new Date("2021-12-02"));
  return moment().diff(date, "days") + "天";
});
</script>
<style lang="scss" scoped>
.records {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      color: #ff404b;
      text-decoration: underline;
    }
  }
  .time {
    font-size: 18px;
    font-weight: bold;
    margin-right: 20px;
    background-image: -webkit-linear-gradient(left, #e66465, #9198e5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
