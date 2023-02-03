<template>
  <div class="wrapper">
    <div class="out" v-loading="loading">
      <el-card
        class="box-card"
        v-for="(item, index) in state.imgList"
        :key="item.id"
        shadow="hover"
      >
        <el-image
          class="box-img"
          :src="item.url"
          :initial-index="index"
          :preview-src-list="state.srcList"
          fit="cover"
          lazy
        >
          <template #error>
            <div class="image-slot">加载失败</div>
          </template>
        </el-image>
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
  srcList: string[];
  limit: number;
  page: number;
  total: number;
}
const state = reactive<IState>({
  imgList: [],
  srcList: [],
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
    state.srcList = result.data.list.map((k: any) => k.url);
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
    justify-content: space-between;
    flex-wrap: wrap;
    ::v-deep .box-card {
      width: 300px;
      width: calc((100% - 48px) / 4);
      // margin-right: 10px;
      margin-bottom: 10px;
      .el-card__body {
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        text-align: center;
        &:hover {
          filter: saturate(1.75);
        }
      }
      .box-img {
        width: 100%;
        height: 100%;
        .el-image__wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 28px;
        }
      }
    }
  }
}
</style>
