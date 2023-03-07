<template>
  <div class="wrapper">
    <el-button type="primary" :icon="Upload" @click="handleCommonDrawer(true)"
      >上传文件</el-button
    >
    <!-- <el-button type="primary"> 新建文件夹 </el-button> -->
    <el-table
      :data="state.allFileList"
      style="width: 100%; margin-top: 20px"
      v-loading="loading"
    >
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column label="文件名">
        <template v-slot="{ row }">
          <div @click="handleOpenFile(row)" class="file_info">
            <img :src="imgSrc(row.file_type)" alt="" />
            <span>{{ row.file_name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="大小"
        prop="file_size"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <div class="operation">
            <span><a :href="row.file_url" class="save">下载</a></span>
            <span v-if="user" @click="handleBeforeDel(row.id)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      v-model="state.showUpload"
      title="上传须知"
      class="right_drawer"
      @close="handleCommonDrawer(false)"
    >
      <el-card class="box-card">
        <ul>
          <li>
            登录用户可以创建属于自己的单独空间，非本账号无法查看，删除文件。
          </li>
          <li>上传文件最大为512MB(不推荐大文件)；粘贴上传文件请勿超过1MB！</li>
          <li>上传大文件时，等待时间略长！</li>
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
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">选择文件 或 粘贴截图</div>
        <template #file="{ file }">
          <div class="img_info">
            <el-image
              :src="file.url"
              class="file_img"
              :preview-src-list="[file.url]"
            >
              <template #error>
                <el-icon><DocumentRemove /></el-icon>
              </template>
            </el-image>
            <span class="file_name">{{ file.name }}</span>
          </div>
          <el-progress
            v-show="file.showProgress"
            :percentage="file.percentage"
          />
        </template>
      </el-upload>
      <el-progress
        v-show="state.showProgress"
        :percentage="state.loadProgress"
      />
    </el-drawer>
    <ComPreview
      :fileInfo="state.previewFileInfo"
      v-model:visible="state.previewVisible"
      @handlePerviewClose="handlePerviewClose"
    />
  </div>
</template>
<script lang="ts" setup name="fileLib">
import throttle from "lodash/throttle";
import { UploadProps, FormInstance } from "element-plus";
import { Upload } from "@element-plus/icons-vue";
import { reqFileList, reqSaveFile, reqDelFile } from "@/api/fileList";
import { reqUpload, reqPasteUpload } from "@/api/common";
import { FILE_TYPE } from "@/utils/constant";
interface IState {
  allFileList: any[];
  fileList: any[];
  showUpload: boolean;
  loadProgress: number;
  showProgress: boolean;
  previewFileInfo: {
    [key in string]: any;
  }; // 预览文件信息
  previewVisible: boolean;
}
const loading = ref(false);
const state = reactive<IState>({
  allFileList: [],
  fileList: [],
  showUpload: false,
  loadProgress: 0,
  showProgress: false,
  previewFileInfo: {}, // 预览文件信息
  previewVisible: false,
});

const handlePerviewClose = () => {
  state.previewFileInfo = {};
};
const handleOpenFile = (item: any) => {
  state.previewFileInfo = {
    name: item.file_name,
    url: item.file_url,
  };
  state.previewVisible = true;
};
// 粘贴上传(防止一直粘贴)
const handleCommonDrawer = (flag: boolean) => {
  state.showUpload = flag;
  state.showUpload
    ? document.addEventListener("paste", throttle(handlePaste, 500))
    : document.removeEventListener("paste", handlePaste);
};
const handlePaste = (event: any) => {
  const items = (event.clipboardData || event.originalEvent.clipboardData)
    .items;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    // 只有是文件为图片类型时才上传
    if (item.type.indexOf("image") !== -1) {
      // 获取文件流
      const blob = item.getAsFile();
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        uploadImage(dataUrl);
      };
      reader.readAsDataURL(blob);
    }
  }
};
const uploadImage = async (dataUrl: any) => {
  const params = new URLSearchParams();
  params.append(
    "file",
    dataUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
  );
  params.append("address", dataUrl);
  const result = await reqPasteUpload(params, handleUploadProgress);
  if (result.code === 200) {
    ElMessage.success("上传成功");
    state.loadProgress = 100;
    state.showProgress = false;
    let data = import.meta.env.DEV
      ? { ...result.data, url: dataUrl }
      : result.data;
    state.fileList.push(data);
    await handleSaveFile(result.data);
    await getFileList();
  } else {
    ElMessage.error(result.msg);
  }
};
// 类型推断排除null、undefined
const user = JSON.parse(localStorage.getItem("userInfo")!);

// 匹配文件图标
const imgSrc = (type: string) => {
  const name = FILE_TYPE.includes(type) ? type : "file";
  return new URL(`../../assets/imgs/icon/${name}.png`, import.meta.url).href;
};
// 上传进度条
const handleUploadProgress = (event: any, reactiveFile: any) => {
  if (reactiveFile) {
    reactiveFile.showProgress = true;
    // loaded: 已上传大小；total：总大小；progress： 实时进度
    reactiveFile.percentage = Math.floor(event.progress * 100);
    if (reactiveFile.percentage >= 99) {
      reactiveFile.percentage = 99;
    }
  } else {
    state.showProgress = true;
    state.loadProgress = Math.floor(event.progress * 100);
    if (state.loadProgress >= 99) {
      state.loadProgress = 99;
    }
  }
};

const handleUpload = async (file: any) => {
  // 不能直接修改file.percentage，不是响应式
  const reactiveFile = reactive(file);
  const params = new FormData();
  params.append("file", reactiveFile.raw);
  const result = await reqUpload(params, (event: any) => {
    handleUploadProgress(event, reactiveFile);
  });
  if (result.code === 200) {
    ElMessage.success("上传成功");
    reactiveFile.showProgress = false;
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
// onChange监听是否选择完成，这里可以处理为按钮手动上传
const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  handleUpload(uploadFile);
};
const handleBeforeDel = (id: number) => {
  ElMessageBox.confirm("确定删除文件该文件吗?", "删除文件", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error",
    center: true,
  })
    .then(() => {
      handleDelFile(id);
    })
    .catch(() => {});
};
const handleDelFile = async (id: number) => {
  const params = { id };
  const result = await reqDelFile(params);
  if (result.code === 200) {
    ElMessage.success("删除文件成功");
    getFileList();
  } else {
    ElMessage.error(result.message);
  }
};

const getFileList = async () => {
  loading.value = true;
  const result = await reqFileList();
  if (result.code === 200) {
    state.allFileList = result.data;
  } else {
    ElMessage.error(result.msg);
  }
  loading.value = false;
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
  .operation {
    white-space: nowrap;
    span {
      cursor: pointer;
      &:first-child a {
        color: #0c64eb;
        text-decoration: none;
      }
    }
    span + span {
      margin-left: 10px;
      color: #dd3434;
    }
  }
  :deep(.file_info) {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 22px;
      height: 22px;
      margin-right: 5px;
    }
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
  :deep(.upload-demo) {
    .el-upload-list__item {
      display: block;
      .img_info {
        display: flex;
        align-items: center;
        .file_img {
          width: 60px;
          height: 60px;
          margin-right: 10px;
          .el-image__wrapper {
            text-align: center;
            line-height: 60px;
            font-size: 40px;
          }
        }
        .file_name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .el-progress__text {
        position: inherit;
        top: 0;
        text-align: right;
      }
    }
  }
  :deep(.el-progress__text) {
    text-align: right;
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
