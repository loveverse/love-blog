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
          :src="item.url_small"
          :initial-index="index"
          :preview-src-list="state.srcList"
          fit="cover"
          lazy
        >
          <template #error>
            <div class="image-slot">{{ $t("loadingFail") }}</div>
          </template>
          <template #placeholder>
            <el-skeleton style="height: 100%" animated :throttle="500">
              <template #template>
                <el-skeleton-item style="height: 100%" variant="image" />
              </template>
            </el-skeleton>
          </template>
        </el-image>

        <!-- <div  > -->
        <a :href="item.url" class="save">{{ $t("save") }}</a>
        <!-- </div> -->
      </el-card>
    </div>
    <el-pagination
      class="paging"
      small
      background
      hide-on-single-page
      @current-change="getImgList"
      :current-page="state.page"
      :page-size="state.limit"
      :pager-count="5"
      layout="prev, pager, next, total"
      :total="state.total"
    >
    </el-pagination>
  </div>
</template>
<script setup lang="ts" name="wallpaper">
import { reqImgList } from "@/api/wallpaper";

const state = reactive({
  imgList: [] as any,
  srcList: [],
  limit: 24,
  page: 1,
  total: 0,
});
const loading = ref<boolean>(false);
onMounted(() => {
  getImgList();
});
const scrollBottom = () => {
  // nextTick(() => {
  // 滚动到底部
  let h: HTMLElement | null = document.getElementById("main");
  h?.scrollTo(0, 0);

  // });
};
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
    scrollBottom();
  } else {
    ElMessage.error(result.msg);
  }
  loading.value = false;
};
// const saveImg = async (info: any) => {
//   window.open(
//     `http://localhost:40001/download/file/000ff11be21eacc4d4809842805b59c33d3f911a.jpg`,
//     "self"
//   );
//   const params = { url: info.url };
//   const result = await reqDownLoad(params);
// };
</script>
<style lang="scss" scoped>
.wrapper {
  .out {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-gap: 20px;
    :deep(.box-card) {
      width: 100%;
      .el-card__body {
        position: relative;
        height: 100%;
        height: 169px;
        padding: 0;
        box-sizing: border-box;
        text-align: center;
        &:hover {
          .save {
            opacity: 1;
          }
        }
      }
      .box-img {
        width: 100%;
        height: 100%;

        .el-image__wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          // pointer-events: none;
          font-size: 28px;
        }
        .el-image__inner {
          &:hover {
            filter: saturate(1.75);
          }
        }
      }
      .save {
        position: absolute;
        top: 0;
        right: 0;
        padding: 2px 4px;
        box-sizing: border-box;
        font-size: 9px;
        background-color: rgba(50, 50, 50, 0.25);
        color: #fafafa;
        border-radius: 8px;
        text-decoration: none;
        cursor: pointer;
        opacity: 0;
        transition: all 0.2s ease-in-out;
      }
    }
  }
  .paging {
    margin-top: 20px;
    justify-content: center;
  }
}
</style>
