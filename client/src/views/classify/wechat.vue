<template>
  <div class="wrapper">
    <div>
      <el-button type="primary" @click="state.userInfoDia = true"
        >添加</el-button
      >
    </div>
    <el-table :data="state.userInfoList" style="margin: 20px 0">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="uid" label="uid"> </el-table-column>
      <el-table-column prop="qq" label="qq"> </el-table-column>
      <el-table-column prop="wx" label="wx"> </el-table-column>
      <el-table-column prop="status" label="账号状态"> </el-table-column>
      <el-table-column prop="text" label="描述"> </el-table-column>
      <el-table-column label="操作" width="210">
        <template #default>
          <el-button type="primary" plain size="small">查询</el-button>
          <el-button type="warning" plain size="small">编辑</el-button>
          <el-button type="danger" plain size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      @current-change="getUserInfoList"
      :current-page="state.page"
      :page-size="state.size"
      :pager-count="5"
      layout="->,prev, pager, next, total"
      :total="state.total"
    >
    </el-pagination>
    <el-dialog v-model="state.userInfoDia" width="60%" title="添加">
      <el-form :model="state.form" label-width="100" ref="formRef">
        <el-form-item label="uid">
          <el-input v-model="state.form.uid" placeholder="请输入uid" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="state.form.name" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="关联wx">
          <el-input v-model="state.form.wx" placeholder="请输入wx" />
        </el-form-item>
        <el-form-item label="关联qq">
          <el-input v-model="state.form.qq" placeholder="请输入qq" />
        </el-form-item>
        <el-form-item label="我的描述">
          <el-input
            v-model="state.form.textInfo.my"
            placeholder="请输入"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="qiqi描述">
          <el-input
            v-model="state.form.textInfo.qiqi"
            placeholder="请输入"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="muqin描述">
          <el-input
            v-model="state.form.textInfo.muqin"
            placeholder="请输入"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="yuequ描述">
          <el-input
            v-model="state.form.textInfo.yuequ"
            placeholder="请输入"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.userInfoDia = false">取消</el-button>
          <el-button type="primary" @click="handSaveUserInfo(formRef)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="wechat">
import { FormInstance } from "element-plus";
import { reqUserInfo, reqAddUserInfo } from "@/api/wechat";

const state = reactive({
  userInfoList: [],
  size: 50,
  page: 1,
  total: 0,
  userInfoDia: false,
  form: {
    uid: "",
    name: "",
    wx: "",
    qq: "",
    textInfo: {
      my: "",
      qiqi: "",
      muqin: "",
      yuequ: "",
    },
  },
});
const loading = ref(false);
const formRef = ref<FormInstance>();
const getUserInfoList = async (page = 1) => {
  state.page = page;
  const params = {
    page: state.page,
    size: state.size,
  };
  const result = await reqUserInfo(params);
  if (result.code === 200) {
    state.total = +result.data.total;
    state.userInfoList = result.data.data;
  } else {
    ElMessage.error(result.msg);
  }
};
const handSaveUserInfo = async (formEl: FormInstance | undefined) => {
  await formEl?.validate(async (valid, fieIds) => {
    if (valid) {
      const params = { ...state.form };
      const result = await reqAddUserInfo(params);
      if (result.code === 200) {
        state.userInfoDia = false;
        ElMessage.success("添加成功");
        getUserInfoList(state.page);
      } else {
        ElMessage.error(result.msg);
      }
    } else {
    }
  });
};
onMounted(() => {
  getUserInfoList();
});
</script>
<style lang="scss" scoped></style>
