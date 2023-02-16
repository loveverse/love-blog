<template>
  <div class="hotword">
    <ul class="out" v-if="state.findData" v-loading="loading">
      <li class="card" v-for="item in state.findData" :key="item.id">
        <p class="title">{{ item.content }}</p>
        <a :href="item.url"> --来自网易云音乐《{{ item.name }}》 </a>
      </li>
    </ul>
    <el-pagination
      small
      @current-change="handlerPage"
      background
      :current-page="state.currentPage"
      :page-size="10"
      :pager-count="5"
      layout="->,prev, pager, next, total"
      :total="state.total"
    >
    </el-pagination>
    <el-backtop target=".el-main" :bottom="50">
      <el-icon><CaretTop /></el-icon>
    </el-backtop>
  </div>
</template>
<script setup lang="ts" name="hotword">
import { reqPageFindData } from "@/api/hotword";

const state = reactive({
  findData: [] as any,
  limit: 10, // 每页显示数
  currentPage: Number(sessionStorage.getItem("page")) || 1, // 当前页
  total: 0,
  oneDay: 1000 * 60 * 60 * 24, // 一天时间
});
const loading = ref(true);
// 回到顶部动画效果
const backTop = (): void => {
  let top = document.body.scrollTop || document.documentElement.scrollTop;
  let timeId = setInterval(() => {
    document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
    if (top <= 0) {
      clearInterval(timeId);
    }
  }, 10);
};
// 改变当前页触发的事件
const handlerPage = async (page = 1) => {
  state.currentPage = page;
  sessionStorage.setItem("page", state.currentPage.toString());
  const params = {
    limit: state.limit,
    page: state.currentPage,
  };
  loading.value = true;
  const result = await reqPageFindData(params);
  if (result.code === 200) {
    state.findData = result.data.list;
    state.total = result.data.total;
    backTop();
  } else {
    ElMessage.error(result.msg);
  }
  loading.value = false;
};

onMounted(() => {
  const page = Number(sessionStorage.getItem("page")) || 1;
  // 有page就传，没有就传默认值1
  handlerPage(page);
  // 当前时间戳大于过期时间，执行一次
  const expires = Number(localStorage.getItem("expires")) || 0;
  if (Date.now() > expires + state.oneDay) {
    localStorage.setItem("expires", Date.now().toString());
    ElNotification({
      message: "点击歌名可跳转到对应歌曲",
      duration: 2000,
    });
  }
});
</script>
<style lang="scss" scoped>
.hotword {
  .out {
    // background: #efeeee;;
    .card {
      margin: 20px auto;
      padding: 15px 20px 20px;
      // height: 100px;
      border-radius: 15px;
      box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.2),
        -18px -18px 30px rgba(255, 255, 255, 1);
      /* 过渡时间 ease-out是指先快速 后慢速 */
      transition: all 0.2s ease-out;
      // box-shadow: 5px 5px 10px #868b8d,
      //       -5px -5px 10px #ffffff;
      &:hover {
        /* inset 是内部阴影 默认是外部阴影outset */
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(255, 255, 255, 0.8),
          inset 18px 18px 30px rgba(0, 0, 0, 0.1),
          inset -18px -18px 30px rgba(255, 255, 255, 1);
        // box-shadow: inset 5px 5px 10px #868b8d,
        //     inset -5px -5px 10px #ffffff;
      }
      .title {
        font-size: 20px;
        margin-bottom: 10px;
        line-height: 30px;
        white-space: pre-wrap;
      }
      a {
        // display: block;
        color: #656d78;
      }
    }
  }
}
</style>
