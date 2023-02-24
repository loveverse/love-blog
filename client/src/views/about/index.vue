<template>
  <div class="wrapper">
    <h2>项目介绍</h2>
    <h3>技术栈</h3>
    <ul class="inn">
      <li>
        <span>前端</span>
        <el-space wrap>
          <el-tag size="large" v-for="item in clientList" :key="item.name">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
          </el-tag>
        </el-space>
      </li>
      <li>
        <span>后端</span>
        <el-space wrap>
          <el-tag size="large" v-for="item in serverList" :key="item.name">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
          </el-tag>
        </el-space>
      </li>
      <li>
        <span>部署</span>
        <el-tag size="large">nginx</el-tag>
      </li>
    </ul>
    <h3>技术点</h3>
    <ul class="point">
      <li>
        聊天室：使用websocket，心跳检测，断线重连等；使用jsonwebtoken，颁发token，设置操作权限等；使用ETag（协商缓存）。
      </li>
      <li>
        学习问题：上传组件，使用koa-body实现上传，开发和生产环境路径的配置。
      </li>
      <li>
        壁纸：使用element-plus的骨架屏，图片懒加载，nginx下载，反向代理，文件访问权限，证书配置等。
      </li>
    </ul>
    <h3>时间节点</h3>
    <el-timeline class="time_line">
      <el-timeline-item timestamp="2023/2" placement="top">
        <el-space direction="vertical" alignment="normal">
          <el-card v-for="(item, index) in timeList" :key="index">
            <h4 class="title">{{ item.title }}</h4>
            <p class="time">{{ item.startTime }}</p>
          </el-card>
        </el-space>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script lang="ts" setup name="about">
import { clientList, serverList } from "./list";
const timeList: any[] = [
  {
    title: "学习问题增加粘贴上传(1mb以内)",
    startTime: "2023/2/24 15:06",
  },
  {
    title: "创建模块完成节点",
    startTime: "2023/2/21 10:37",
  },
];
</script>
<style lang="scss" scoped>
// @keyframes shining {
//   from {
//     text-shadow: 0 0 2px rgba(182, 211, 207, 0.9),
//       0 0 1px rgba(182, 211, 207, 0.3), 0 0 2px rgba(15, 115, 223, 0.3),
//       0 0 1px rgba(15, 115, 223, 0.9), 0 0 2px rgba(15, 115, 223, 0.8),
//       0 0 1px rgba(15, 115, 223, 0.9);
//   }
//   to {
//     text-shadow: 0 0 2px rgba(182, 211, 207, 1),
//       0 0 2px rgba(182, 211, 207, 0.4), 0 0 3px rgba(15, 115, 223, 0.4),
//       0 0 2px rgba(15, 115, 223, 0.8), 0 0 3px rgba(15, 115, 223, 0.9),
//       0 0 2px rgba(15, 115, 223, 1);
//   }
// }
.wrapper {
  font-family: "Pacifico", cursive;
  h2 {
    font-size: 28px;
    font-weight: bold;
    line-height: 56px;
  }
  h3 {
    font-size: 22px;
    font-weight: bold;
    line-height: 44px;
    color: #333;
    margin-top: 5px;
  }
  .inn {
    padding-left: 20px;
    li {
      display: flex;
      align-items: center;
      .el-tag {
        font-size: 14px;
        // font-weight: bold;
        cursor: pointer;
        a {
          color: #409eff;
          text-decoration: none;
          &:hover {
            color: #ff404b;
            text-decoration: underline;
          }
        }
      }
      & > span:nth-child(1) {
        margin-right: 10px;
        font-weight: bold;
        white-space: nowrap;
      }
      & + li {
        margin-top: 15px;
      }
    }
  }
  .point {
    list-style: initial;
    padding-left: 40px;
    li {
      line-height: 28px;
      font-size: 16px;

      text-transform: uppercase;
      animation: shining 0.1s alternate infinite;
    }
  }
  .time_line {
    width: 100%;
    .el-space {
      width: 100%;
      .title {
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: bold;
        background-image: linear-gradient(
          to right,
          #00c6ff,
          #124057
        ); /* 线性渐变背景，方向向右 */
        -webkit-background-clip: text; /* 背景被裁剪成文字的前景色 */
        -webkit-text-fill-color: transparent; /* 文字填充颜色变透明 */
      }
      .time {
        color: rgb(136, 124, 121);
      }
    }
  }
}
</style>
