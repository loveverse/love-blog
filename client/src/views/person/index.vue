<template>
  <div class="wrapper" ref="contentRef" v-loading="loading">
    <ul class="out" :class="state.flag && 'outPad'">
      <li class="card" v-for="item in state.findData" :key="item.id">
        <div class="artcle">
          <el-input
            v-if="item.id === state.aId"
            v-model="item.content"
            type="textarea"
            autosize
            @blur="update(item.id, item.content)"
          ></el-input>
          <p
            v-else
            class="title"
            :data-id="item.id"
            @click="edit($event, item.content)"
          >
            {{ item.content }}
          </p>
          <div class="tip">
            <p class="date_now">{{ item.date }}</p>
            <p class="author" v-if="item.author">--来自“{{ item.author }}”</p>
          </div>
        </div>
        <el-button
          v-if="state.flag"
          type="danger"
          size="mini"
          class="del"
          @click="del(item.id)"
          >删除</el-button
        >
      </li>
    </ul>
    <el-tag type="success">
      共&emsp;{{ state.findData.length }}&emsp;篇
    </el-tag>
    <div class="iptText">
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
    </div>
    <el-backtop :bottom="100">
      <div class="backtop"></div>
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
import { formatterTime } from "@/utils/common";
import Ws from "@/utils/websocket";

interface IState {
  findData: any[];
  text: string;
  author: string;
  aId: number;
  compare: string;
  flag: boolean;
}

const state = reactive<IState>({
  findData: [],
  text: "",
  author: "",
  aId: 0,
  compare: "",
  flag: false,
});
const loading = ref(true);
const contentRef = ref<any>(null);
onMounted(() => {
  Ws.initWebsocket(global_callback);
  getFindExcerptData();
  scrollBottom();
});
onUpdated(() => {
  scrollBottom();
});
watch(
  () => state.text,
  (newVal: string) => {
    if (newVal === "loveverse") {
      state.flag = true;
    } else {
      state.flag = false;
    }
  }
);
//接收服务器发送的消息
const global_callback = (msg: any) => {
  console.log(msg);
};
const getFindExcerptData = async () => {
  loading.value = true;
  const result = await reqFindExcerptData();
  if (result.code === 200) {
    state.findData = result.data.map((item: any) => {
      item.date = formatterTime(item.date);
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
    Ws.sendWebsocket(params);
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
  } else {
    ElMessage.error(result.msg);
  }
};
const scrollBottom = () => {
  nextTick(() => {
    // 滚动到底部
    contentRef.value.scrollIntoView(false);
  });
};
</script>
<style lang="scss" scoped>
.out {
  .card {
    position: relative;
    .artcle {
      margin: 20px auto;
      padding: 15px 20px 20px;
      border-radius: 15px;
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
        // margin-bottom: 10px;
        line-height: 33px;
        white-space: pre-wrap;
      }
      .tip {
        display: flex;
        justify-content: space-between;
        .author {
          margin-top: 10px;
        }
        .date_now {
          margin-left: 5px;
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
.outPad {
  padding-right: 80px;
}
.iptText {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 30px auto;
  .el-input {
    margin: 20px auto;
  }
}
::v-deep .el-backtop {
  width: 0;
  height: 0;
  bottom: 55px !important;
}
.backtop {
  border: 10px solid #9ddb95;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
}
.records {
  margin: 0 auto;
  text-align: center;
}
</style>
