<template>
  <div class="wrapper">
    <el-table :data="state.issueList" style="width: 100%">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column label="问题标题">
        <template v-slot="{ row }">
          <el-input
            v-if="row.status"
            v-model="row.title"
            placeholder="Please input"
          />
          <p v-else>{{ row.title }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="问题图片" width="auto">
        <template v-slot="{ row }"> </template>
      </el-table-column>
      <el-table-column prop="link" label="链接" width="auto">
        <template v-slot="{ row }">
          <el-input
            v-if="row.status"
            v-model="row.link"
            placeholder="Please input"
          />
          <p v-else>{{ row.link }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="{ row }">
          <span @click="handleSaveIssue(row)" v-if="row.status">保存</span>
          <span>编辑</span>
          <span>删除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts" name="issue">
import { reqIssueList, reqAddIssue } from "@/api/issue";
interface IState {
  issueList: object[];
}
const state = reactive<IState>({
  issueList: [],
});
const getIssueList = async () => {
  const result = await reqIssueList();
  if (result.code === 200) {
    let obj = {
      title: "aa",
      link: "",
      status: 1,
      file: {},
    };
    state.issueList = [...result.data, obj];
  } else {
    ElMessage.error(result.msg);
  }
};
// 保存即添加
const handleSaveIssue = async (row: any) => {
  row.status = 0;
  const result = await reqAddIssue(row);
  if (result.code === 200) {
    getIssueList();
    ElMessage.success("保存成功");
  } else {
    ElMessage.error(result.msg);
  }
};
onMounted(() => {
  getIssueList();
});
</script>
<style lang="scss" scoped></style>
