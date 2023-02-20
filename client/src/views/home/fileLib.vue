<template>
  <div class="wrapper">
    <el-button type="primary" :icon="Upload" @click="state.showUpload = true"
      >上传文件</el-button
    >
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
    <el-drawer
      v-model="state.showUpload"
      title="上传须知"
      :size="500"
      :before-close="() => (state.showUpload = false)"
    >
      <el-card class="box-card">
        <ul>
          <!-- <el-space wrap :size="20"> -->
          <li>上传文件最大为1G，不过接口超时时间为50秒(不推荐大文件)。</li>
          <li>登录用户可以创建文件夹，非本账号无法查看，删除文件。</li>
          <!-- </el-space> -->
        </ul>
      </el-card>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup name="fileLib">
import { Upload } from "@element-plus/icons-vue";
const state = reactive({
  fileList: [] as any[],
  showUpload: false,
});
</script>
<style lang="scss" scoped>
.box-card {
  border-left: 5px solid #409eff;
  background-color: #f2f2f2;
  color: #606266;
  ul {
    list-style: initial;
    li {
      font-size: 14px;
      & + li {
        margin-top: 20px;
      }
    }
  }
}
</style>
