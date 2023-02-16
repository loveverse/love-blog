<template>
  <div class="wrapper" v-loading="loading">
    <el-button type="primary" @click="state.issueDialog = true"
      >新建问题</el-button
    >
    <el-table
      :data="state.issueList"
      style="width: 100%; margin-top: 20px"
      :header-cell-style="{ background: '#eee' }"
    >
      <el-table-column prop="id" label="序号" width="80" />
      <el-table-column prop="title" label="问题标题"> </el-table-column>
      <el-table-column prop="link" label="链接" width="auto"> </el-table-column>
      <el-table-column prop="content" label="问题图片" width="auto">
      </el-table-column>

      <el-table-column label="操作" width="200" align="center">
        <template v-slot="{ row }">
          <div class="operation">
            <span>编辑</span>
            <span>删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="state.issueDialog" :title="state.issueTitle">
      <el-form
        :model="state.issueInfo"
        :rules="state.issueInfoRules"
        ref="issueRef"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="state.issueInfo.title"
            placeholder="请输入标题"
            maxlength="100"
          />
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="state.issueInfo.link" placeholder="请输入链接" />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            v-model:file-list="state.issueInfo.fileList"
            class="upload-demo"
            action="#"
            :auto-upload="false"
            :on-change="handleChange"
          >
            <el-button type="primary">上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.issueDialog = false">取消</el-button>
          <el-button type="primary" @click="handleSaveIssue(issueRef)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="issue">
import { reqIssueList, reqAddIssue } from "@/api/issue";
import { reqUpload } from "@/api/common";
import { UploadUserFile, UploadProps, FormInstance } from "element-plus";

const state = reactive({
  issueList: [] as object[],
  issueDialog: false,
  issueInfo: {} as any,
  issueInfoRules: {
    title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
    link: [{ required: true, message: "链接不能为空", trigger: "blur" }],
  },
  issueTitle: "新增问题",
});

const loading = ref(true);
const issueRef = ref<FormInstance>();
const getIssueList = async () => {
  loading.value = true;
  const result = await reqIssueList();
  if (result.code === 200) {
    state.issueList = result.data;
  } else {
    ElMessage.error(result.msg);
  }
  loading.value = false;
};
// 保存即添加
const handleSaveIssue = async (formEl: FormInstance | undefined) => {
  await formEl?.validate(async (valid, fields) => {
    if (valid) {
      const result = await reqAddIssue(state.issueInfo);
      if (result.code === 200) {
        ElMessage.success("保存成功");
        getIssueList();
      } else {
        ElMessage.error(result.msg);
      }
    } else {
      console.log("error submit!", fields);
    }
  });
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
    console.log("[ 111 ] >", 111);
    ElMessage.error(result.msg);
  }
};
onMounted(() => {
  getIssueList();
});
</script>
<style lang="scss" scoped>
.operation {
  span {
    cursor: pointer;
    &:first-child {
      color: #430ef0;
    }
    &:last-child {
      color: #dd3434;
    }
    & + span {
      margin-left: 20px;
    }
  }
}
</style>
