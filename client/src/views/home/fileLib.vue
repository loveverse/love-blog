<template>
  <div class="wrapper">
    <el-button type="primary" :icon="Upload" @click="state.showUpload = true"
      >上传文件</el-button
    >
    <el-button type="primary"> 新建文件夹 </el-button>
    <el-table
      :data="state.allFileList"
      style="width: 100%; margin-top: 20px"
      :header-cell-style="{ background: '#eee' }"
    >
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column label="文件名" prop="file_name"></el-table-column>
      <el-table-column
        label="大小"
        prop="file_size"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-space :size="20">
            <span>删除</span>
          </el-space>
          <a :href="row.file_url" class="save">下载</a>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      v-model="state.showUpload"
      title="上传须知"
      class="right_drawer"
      :before-close="() => (state.showUpload = false)"
    >
      <el-card class="box-card">
        <ul>
          <!-- <el-space wrap :size="20"> -->
          <li>上传文件最大为1G，接口超时时间为50秒(不推荐大文件)。</li>
          <li>登录用户可以创建文件夹，非本账号无法查看，删除文件。</li>
          <!-- </el-space> -->
        </ul>
      </el-card>

      <el-upload
        :file-list="state.fileList"
        class="upload-demo"
        action="#"
        :auto-upload="false"
        drag
        list-type="picture"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-preview="handlePictureCardPreview"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">选择文件 或 粘贴截图</div>
      </el-upload>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup name="fileLib">
import { UploadProps, FormInstance } from "element-plus";
import { Upload } from "@element-plus/icons-vue";
import { reqFileList, reqSaveFile } from "@/api/fileList";
import { reqUpload, reqPasteUpload } from "@/api/common";
const state = reactive({
  allFileList: [] as any[],
  fileList: [] as any[],
  showUpload: false,
});

const handleUpload = async (file: any) => {
  const params = new FormData();
  params.append("file", file);
  const result = await reqUpload(params);
  if (result.code === 200) {
    ElMessage.success("上传成功");
    state.fileList.push(result.data);
    await handleSaveFile(result.data);
    await getFileList();
  } else {
    ElMessage.error(result.msg);
  }
};
const handleSaveFile = async (info: any) => {
  const result = await reqSaveFile(info);
  if (result.code === 200) {
  } else {
    ElMessage.error(result.msg);
  }
};
const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  handleUpload(uploadFile.raw);
};
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  // state.issueInfo.fileList = state.issueInfo.fileList.filter(
  //   (k: any) => k.name !== uploadFile.name
  // );
};
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  // state.imgUrl = uploadFile.url!;
  // state.imgPreviewDia = true;
};
const getFileList = async () => {
  const result = await reqFileList();
  if (result.code === 200) {
    state.allFileList = result.data;
    // ElMessage.success(result.message);
  } else {
    ElMessage.error(result.msg);
  }
};
onMounted(() => {
  getFileList();
});
</script>
<style lang="scss" scoped>

.wrapper {
  :deep(.right_drawer) {
    width: 500px !important;
  }
  .box-card {
    border-left: 5px solid #409eff;
    background-color: #f2f2f2;
    color: #606266;
    margin-bottom: 20px;
    ul {
      list-style: initial;
      padding-left: 15px;
      li {
        font-size: 14px;
        & + li {
          margin-top: 20px;
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .wrapper {
    :deep(.right_drawer) {
      width: 80% !important;
    }
  }
}
</style>
