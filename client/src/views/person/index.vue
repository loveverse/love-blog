<template>
  <div>
    <ul class="out" :class="isDel && 'outPad'">
      <li class="card" v-for="item in findData" :key="item.id">
        <div class="artcle">
          <el-input
            type="textarea"
            autosize
            v-if="item.id == aId"
            v-model="item.content"
            @blur="update(item.id, item.content)"
            @keyup.enter.native="blur"
            v-focus
          ></el-input>
          <p
            class="title"
            v-else
            :data-id="item.id"
            @click="edit($event, item.content)"
          >
            {{ item.content }}
          </p>
          <div class="songName" v-if="item.name">
            <span>评论者：{{ item.name }}--</span>
            <span>歌曲名：{{ item.songname }}</span>
          </div>
        </div>
        <el-button
          type="danger"
          size="mini"
          class="del"
          v-show="isDel"
          @click="delOneData(item.id)"
          >删除</el-button
        >
      </li>
    </ul>
    <div class="iptText">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="text"
      >
      </el-input>
      <el-button type="primary" size="medium" @click="addContent"
        >提交</el-button
      >
    </div>
    <el-upload
      class="upload-demo"
      drag
      :before-upload="beforeUpload"
      action="/api2"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>
<script setup lang="ts" name="person">
import {
  reqFindData,
  reqAddData,
  reqUpdateData,
  reqDelData,
} from "@/api/person";
interface IState {
  findData: object[];
  text: string;
  isShowEdit: true;
  aId: string;
  compare: string;
  isDel: boolean;
}
const state = reactive<IState>({
  findData: [],
  text: "",
  isShowEdit: true,
  aId: "",
  compare: "",
  isDel: !!localStorage.getItem("flag"),
});
</script>
<style lang="scss" scoped>
.out {
  background: #efeeee;
  padding: 30px;
  .card {
    position: relative;
    // border: 1px solid #454;

    &:last-child {
      margin-bottom: 0;
    }
    .artcle {
      margin: 0 auto 30px;
      padding: 10px;
      height: 100px;
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
        color: #66b1ff;
        text-align: center;
        font-weight: 600;
        padding-bottom: 13px;
        // margin-bottom: 10px;
      }
      .songName {
        text-align: right;
      }
    }

    // a{
    //   display: block;
    // }

    .del {
      position: absolute;
      right: -70px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.outPad {
  padding-right: 100px;
}
.iptText {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 30px auto;
  .el-textarea {
    margin-bottom: 20px !important;
  }
}
</style>
