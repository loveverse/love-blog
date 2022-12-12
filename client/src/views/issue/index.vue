<template>
  <div class="wrapper">
    <el-table :data="state.issueList" style="width: 100%">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="content" label="问题标题" width="auto" />
      <el-table-column prop="link" label="链接" width="auto" />
    </el-table>
  </div>
</template>
<script setup lang="ts">
interface IState {
  issueList: object[];
}
const state = reactive<IState>({
  issueList: [
    {
      content: "aa",
      link: "",
    },
  ],
});
</script>
<style lang="scss" scoped></style>
