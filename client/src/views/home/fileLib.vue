<template>
  <div class="wrapper">
    <el-button type="primary" :icon="Upload">上传文件</el-button>
    <el-button type="primary"> 新建文件夹 </el-button>
    <el-table
      :data="state.fileList"
      style="width: 100%; margin-top: 20px"
      :header-cell-style="{ background: '#eee' }"
    >
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column label="链接"></el-table-column>
      <el-table-column label="过期时间"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    
  </div>
</template>
<script lang="ts" setup name="fileLib">
import { Upload } from "@element-plus/icons-vue";
const state = reactive({
  fileList: [] as any[],
});
</script>
<style lang="scss" scoped></style>
