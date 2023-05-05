<template>
  <div class="wrapper">
    <div style="margin-bottom: 20px">
      <el-button type="primary">添加</el-button>
    </div>
    <el-table :data="state.userInfoList" style="width: 100%">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="uid" label="uid"> </el-table-column>
      <el-table-column prop="qq" label="qq"> </el-table-column>
      <el-table-column prop="wx" label="wx"> </el-table-column>
      <el-table-column prop="status" label="账号状态"> </el-table-column>
      <el-table-column prop="text" label="描述"> </el-table-column>
      <el-table-column label="操作">
        <template #default>
          <el-button type="warning" plain size="small">编辑</el-button>
          <el-button type="danger" plain size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts" name="wechat">
import { reqRegisterUser } from "@/api/wechat";

const state = reactive({
  userInfoList: [],
  size: 50,
  page: 1,
  total: 0,
});
const getUserInfoList = async (page = 1) => {
  state.page = page;
  const params = {
    page: state.page,
    size: state.size,
  };
  const result = await reqRegisterUser(params);
  if (result.code === 200) {
    state.total = +result.total;
    state.userInfoList = result.data.data;
  } else {
    ElMessage.error(result.msg);
  }
};
onMounted(() => {
  getUserInfoList();
});
</script>
<style lang="scss" scoped></style>
