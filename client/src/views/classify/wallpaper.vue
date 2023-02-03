<template>
  <div class="wrapper">
    <div class="out">
      <el-card class="box-card" v-for="item in state.imgList" :key="item.id">
        <el-image class="box-img" :src="item.url" />
      </el-card>
    </div>
    <el-pagination
      small
      @current-change="getImgList"
      background
      :current-page="state.page"
      :page-size="20"
      :pager-count="5"
      layout="->,prev, pager, next, total"
      :total="state.total"
    >
    </el-pagination>
  </div>
</template>
<script setup lang="ts" name="wallpaper">
import { reqImgList } from "@/api/wallpaper";
interface IState {
  imgList: any[];
  limit: number;
  page: number;
  total: number;
}
const state = reactive<IState>({
  imgList: [],
  limit: 20,
  page: 1,
  total: 0,
});
const loading = ref(true);
onMounted(() => {
  getImgList();
});
const getImgList = async (page = 1) => {
  state.page = page;
  const params = {
    limit: state.limit,
    page: state.page,
  };
  loading.value = true;
  const result = await reqImgList(params);
  if (result.code === 200) {
    state.imgList = result.data.list;
    state.total = result.data.total;
  } else {
    ElMessage.error(result.msg);
  }
  loading.value = false;
};
</script>
<style lang="scss" scoped>
.wrapper {
  .out {
    display: flex;
    flex-wrap: wrap;
    .box-card {
      width: calc((100% - 48px) / 4);
      margin-right: 10px;
      margin-bottom: 10px;
      .box-img {
        width: 100%;
      }
    }
  }
}
</style>
