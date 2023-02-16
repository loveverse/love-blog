<template>
  <div class="wrapper" ref="contentRef">
    <ul class="out" :class="state.flag && 'out_pad'" v-loading="loading">
      <li class="card" v-for="item in state.findData" :key="item.id">
        <div class="artcle">
          <el-input
            v-if="item.id === state.aId"
            v-model="item.content"
            type="textarea"
            autosize
            @blur="update(item.id, item.content)"
          ></el-input>
          <template v-else>
            <el-link
              v-if="item.isLink"
              class="title"
              type="primary"
              :href="item.content"
              :data-id="item.id"
              @click="edit($event, item.content)"
              >{{ item.content }}</el-link
            >
            <p
              v-else
              class="title"
              :data-id="item.id"
              @click="edit($event, item.content)"
            >
              {{ item.content }}
            </p>
          </template>
          <div class="tip">
            <p class="date_now">{{ item.date }}</p>
            <p class="author" v-if="item.author">--来自“{{ item.author }}”</p>
          </div>
        </div>
        <el-button
          v-if="state.flag"
          type="danger"
          size="small"
          class="del"
          @click="del(item.id)"
          >删除</el-button
        >
      </li>
    </ul>
    <div class="site_info">
      <el-tag type="success">
        共&emsp;{{ state.findData.length }}&emsp;篇
      </el-tag>
      <el-result
        class="status"
        :icon="state.connectStatus === 1 ? 'success' : 'error'"
        :title="state.connectStatus === 1 ? '已连接' : '已关闭，请刷新'"
      >
      </el-result>
    </div>
    <div class="ipt_text">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        ref="gainFocus"
        v-model="state.text"
      >
      </el-input>
      <el-input
        clearable
        placeholder="请输入作者"
        maxlength="30"
        v-model.trim="state.author"
      >
      </el-input>
      <el-button type="primary" @click="addExcerptData">提交</el-button>
      <el-button @click="handleClose">关闭连接</el-button>
    </div>
    <el-backtop target=".el-main" :bottom="50">
      <el-icon><CaretTop /></el-icon>
    </el-backtop>
  </div>
</template>
<script setup lang="ts" name="person">
import {
  reqFindExcerptData,
  reqAddExcerptData,
  reqUpdateExcerptData,
  reqDelExcerptData,
} from "@/api/person";
import { formatterTime, urlify } from "@/utils/common";
import Ws from "@/utils/websocket";
// 将Ws放在state中同时监视，watch不到里面的对象和属性，因为没有实例化WebSocket

const state = reactive({
  findData: [] as any,
  text: "",
  author: "",
  aId: 0,
  compare: "",
  flag: false,
  connectStatus: 0, // 连接状态：0:连接中;1:已连接;2:关闭中;3:已关闭
});
const loading = ref(true);
const contentRef = ref<any>(null);
onMounted(async () => {
  Ws.initWebsocket(global_callback, close_callback);
  await getFindExcerptData();
  scrollBottom();
});
onBeforeUnmount(() => {
  Ws.closeWebsocket();
});
watch(
  () => state.text,
  (newVal: string) => {
    state.flag = newVal === "loveverse";
  }
);

const handleClose = () => {
  Ws.websocket.close();
  ElMessage.warning("连接断开，消息不再即时推送！");
};
// 连接断开通知
const close_callback = () => {
  if (Ws.websocket) {
    state.connectStatus = Ws.websocket.readyState;
  }
};
//接收服务器发送的消息
const global_callback = (msg: any) => {
  if (Ws.websocket) {
    state.connectStatus = Ws.websocket.readyState;
  }
  if (JSON.parse(msg).isUpdate === false) {
    console.log(msg);
    return;
  }
  state.findData = JSON.parse(msg).map((item: any) => {
    item.date = formatterTime(item.date);
    item.isLink = urlify(item.content);
    return item;
  });
  if (!state.flag) {
    scrollBottom();
  }
};
const getFindExcerptData = async () => {
  loading.value = true;
  const result = await reqFindExcerptData();
  if (result.code === 200) {
    state.findData = result.data.map((item: any) => {
      item.date = formatterTime(item.date);
      item.isLink = urlify(item.content);
      return item;
    });
  } else {
    ElMessage.error(result.msg);
  }
  loading.value = false;
};
// 添加数据
const addExcerptData = async () => {
  if (!state.text.trim()) {
    ElMessage.warning("输入的内容不能为空！");
    state.text = "";
    return;
  }
  const params = {
    content: state.text.trim(),
    author: state.author,
    flag: 1,
    date: new Date(),
  };
  const result = await reqAddExcerptData(params);
  if (result.code === 200) {
    ElMessage.success("内容发布成功！");
    Ws.sendWebsocket(JSON.stringify({ type: "personData" }));
    state.text = "";
    state.author = "";
  } else {
    ElMessage.error(result.msg);
  }
};
// 编辑模式
const edit = (e: MouseEvent | any, content: string) => {
  if (!state.flag) return;
  // 接口和数据库中id都为数字类型，而event对象是字符串，需要转换
  state.aId = +e.currentTarget.dataset.id;
  state.compare = content;
};
const update = async (id: number, content: string) => {
  state.aId = 0;
  if (state.compare !== content) {
    const params = {
      id,
      content,
    };
    const result = await reqUpdateExcerptData(params);
    if (result.code === 200) {
      ElMessage.success("内容修改成功！");
    } else {
      ElMessage.error(result.msg);
    }
  }
};
const del = async (id: number) => {
  const params = { id };
  const result = await reqDelExcerptData(params);
  if (result.code === 200) {
    ElMessage.success("内容删除成功！");
    Ws.sendWebsocket(JSON.stringify({ type: "personData" }));
  } else {
    ElMessage.error(result.msg);
  }
};
const scrollBottom = () => {
  // 添加内容需实时计算
  nextTick(() => {
    // 滚动到底部
    let h: any = document.getElementById("main");
    h.scrollTo(0, h?.scrollHeight);
    // contentRef.value.scrollIntoView(false);
  });
};
</script>
<style lang="scss" scoped>
.wrapper {
  .out {
    .card {
      position: relative;
      .artcle {
        margin-bottom: 20px;
        padding: 15px 20px 20px;
        border-radius: 4px;
        word-wrap: break-word;
        box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.2),
          -18px -18px 30px rgba(255, 255, 255, 1);
        /* 过渡时间 ease-out是指先快速 后慢速 */
        transition: all 0.2s ease-out;
        &:hover {
          /* inset 是内部阴影 默认是外部阴影outset */
          box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(255, 255, 255, 0.8),
            inset 18px 18px 30px rgba(0, 0, 0, 0.1),
            inset -18px -18px 30px rgba(255, 255, 255, 1);
        }
        .title {
          font-size: 20px;
          margin-bottom: 10px;
          line-height: 33px;
          /* 允许在单词内换行 */
          word-break: break-all;
        }
        .tip {
          display: flex;
          justify-content: space-between;
          .date_now {
            color: #999;
          }
        }
      }
      .del {
        position: absolute;
        right: -80px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .out_pad {
    padding-right: 80px;
  }
  .site_info {
    display: flex;
    align-items: center;
    // .status_box {
    //   display: flex;
    //   align-items: center;
    .status {
      padding: 0;
      transform: scale(0.4);
      margin: 0;
      --el-result-extra-margin-top: 0;
      --el-result-padding: 0;
      --el-result-icon-font-size: 32px;
    }
    // }
  }
  .ipt_text {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px auto;
    .el-input {
      margin: 20px auto;
    }
  }
}
</style>
