<template>
  <div class="wrapper" v-loading="loading">
    <el-table :data="state.issueList" style="width: 100%">
      <el-table-column prop="id" label="序号" width="80" />
      <el-table-column label="问题标题">
        <template v-slot="{ row }">
          <el-input
            v-if="row.status"
            v-model="row.title"
            placeholder="输入标题"
          />
          <p v-else>{{ row.title }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="link" label="链接" width="auto">
        <template v-slot="{ row }">
          <el-input
            v-if="row.status"
            v-model="row.link"
            placeholder="输入链接"
          />
          <p v-else>{{ row.link }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="问题图片" width="auto">
        <template v-slot="{ row }">
          <el-upload
            v-model:file-list="row.fileList"
            class="upload-demo"
            action="#"
            :auto-upload="false"
            :on-change="handleChange"
          >
            <el-button type="primary">上传</el-button>
          </el-upload>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template v-slot="{ row }">
          <span @click="handleSaveIssue(row)" v-show="row.status">保存</span>
          <span v-show="!row.status" @click="row.status = 1">编辑</span>
          <span v-show="!row.status">删除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts" name="issue">
import { reqIssueList, reqAddIssue } from "@/api/issue";
import { reqUpload } from "@/api/common";
import { UploadUserFile, UploadProps, ElMessage } from "element-plus";
interface IState {
  issueList: object[];
}

const state = reactive<IState>({
  issueList: [],
});

const loading = ref(true);
const getIssueList = async () => {
  loading.value = true;
  const result = await reqIssueList();
  if (result.code === 200) {
    let obj = {
      title: "",
      link: "",
      status: 1,
      file: {},
    };
    state.issueList = [obj, ...result.data];
  } else {
    ElMessage.error(result.msg);
  }
  loading.value = false;
};
// 保存即添加
const handleSaveIssue = async (row: any) => {
  if (!row.title.trim() || !row.link.trim()) {
    ElMessage.warning("标题和链接不能为空");
    return;
  }
  row.status = 0;
  const result = await reqAddIssue(row);
  if (result.code === 200) {
    ElMessage.success("保存成功");
    getIssueList();
  } else {
    ElMessage.error(result.msg);
  }
};
const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  console.log("[ uploadFile ] >", uploadFile);
  handleUpload(uploadFile.raw);
};
const handleUpload = async (file: any) => {
  const params = new FormData();
  params.append("file", file);
  const result = await reqUpload(params);
  if (result.code === 200) {
    ElMessage.success("上传成功");
  } else {
    ElMessage.error(result.msg);
    
  }
};
onMounted(() => {
  getIssueList();
});
</script>
<style lang="scss" scoped></style>
