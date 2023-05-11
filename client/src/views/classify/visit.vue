<template>
  <div class="wrapper">
    <el-table :data="state.ipList" style="margin: 20px 0">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="ip" label="ip"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="operator" label="运营商"> </el-table-column>
      <el-table-column prop="" label="时间">
        <template #default="{ row }">
          <span>{{ formatterTime(row.createdAt) }}</span>
        </template>
      </el-table-column>
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
      @current-change="getIpList"
      :current-page="state.page"
      :page-size="state.size"
      :pager-count="5"
      layout="->,prev, pager, next, total"
      :total="state.total"
    >
    </el-pagination>
  </div>
</template>
<script setup lang="ts" name="visit">
import { reqIpList } from "@/api/ips";
import { formatterTime } from "@/utils/common";
const state = reactive({
  ipList: [],
  page: 1,
  size: 20,
  total: 0,
  oneDay: 1000 * 60 * 60 * 24,
});
const getIpList = async (page = 1) => {
  state.page = page;
  const params = {
    page: state.page,
    size: state.size,
  };
  const result = await reqIpList(params);
  if (result.code === 200) {
    state.total = +result.data.total;
    state.ipList = result.data.data;
  } else {
    ElMessage.error(result.msg);
  }
};
onMounted(() => {
  getIpList();
  // 当前时间戳大于过期时间，执行一次
  const expires = Number(localStorage.getItem("expires1")) || 0;
  if (Date.now() > expires + state.oneDay) {
    localStorage.setItem("expires1", Date.now().toString());
    ElNotification({
      message: "重复ip每隔10分钟记录一次",
      type: "warning",
      duration: 2000,
    });
  }
});
</script>
<style lang="scss" scoped></style>
