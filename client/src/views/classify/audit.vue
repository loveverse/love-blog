<template>
  <div class="wrapper">
    <el-table :data="state.auditList" style="margin-bottom: 20px">
      <el-table-column type="index" label="序号" width="80" align="center">
        <template #default="{ $index }">
          <span>{{ (state.page - 1) * state.size + $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="wid" label="微信标识"> </el-table-column>
      <el-table-column prop="count" label="uid" class-name="uid">
        <template #default="{ row }">
          <div @click="handleCopy(row)">{{ row.count }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'warning'">{{
            row.status ? "审核通过" : "待审核"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="" label="发送时间">
        <template #default="{ row }">
          <span>{{ formatterTime(row.createdAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="80" align="center">
        <template #default="{ row }">
          <el-button
            type="danger"
            plain
            size="small"
            @click="handleOperation('del', row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      @current-change="getAuditList"
      :current-page="state.page"
      :page-size="state.size"
      :pager-count="5"
      layout="->,prev, pager, next, total"
      :total="state.total"
    >
    </el-pagination>
  </div>
</template>
<script setup lang="ts" name="audit">
import { formatterTime } from "@/utils/common";
import { reqAuditList, reqUpdateAudit, reqDeleteAudit } from "@/api/wechat";
const state = reactive({
  auditList: [],
  page: 1,
  size: 20,
  total: 0,
});
const handleOperation = (type: string, info: any = null) => {
  deleteAudit(info.id);
};
const deleteAudit = async (id: string) => {
  const result = await reqDeleteAudit({ id });
  if (result.code === 200) {
    ElMessage.success("删除成功");
    getAuditList(state.page);
  } else {
    ElMessage.error(result.msg);
  }
};
const handleCopy = (info: any) => {
  navigator.clipboard.writeText(info.count).then(
    () => {
      ElMessage.success("复制成功");
      updateAudit(info);
    },
    () => {
      ElMessage.error("复制失败");
    }
  );
};
const updateAudit = async (info: any) => {
  if (info.status) {
    return;
  }
  const result = await reqUpdateAudit({ id: info.id });
  if (result.code === 200) {
    getAuditList(state.page);
  } else {
    ElMessage.error("更新失败");
  }
};
const getAuditList = async (page = 1) => {
  state.page = page;
  const params = {
    page: state.page,
    size: state.size,
  };
  const result = await reqAuditList(params);
  if (result.code === 200) {
    state.total = +result.data.total;
    state.auditList = result.data.data;
  } else {
    ElMessage.error(result.msg);
  }
};
onMounted(() => {
  getAuditList();
});
</script>
<style lang="scss" scoped>
.wrapper {
  :deep(.uid) {
    cursor: pointer;
  }
}
</style>
