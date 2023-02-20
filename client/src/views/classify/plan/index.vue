<template>
  <div class="wrapper">
    <div class="major_info">
      <h3>专业代码：080901</h3>
      <h3>专业名称：计算机科学与技术</h3>
      <h3>考试时间：4.15/10.28</h3>
    </div>
    <el-table :data="SUBJECT_LIST" style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="80px" />
      <el-table-column prop="number" label="类型序号" align="center" />
      <el-table-column prop="code" label="课程代码" align="center" />
      <el-table-column type="expand">
        <template #default="props">
          <ul>
            <li>
              <b>教材名称：</b>
              <span>{{ props.row.bookName }}</span>
            </li>
            <li>
              <b>主编：</b>
              <span>{{ props.row.editor }}</span>
            </li>
            <li>
              <b>出版社：</b>
              <span>{{ props.row.press }}</span>
            </li>
            <li>
              <b>版次：</b>
              <span>{{ props.row.edition }}</span>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="课程名称" />
      <el-table-column prop="credit" label="学分" align="center" />
      <el-table-column prop="type" label="类型" align="center" />
      <el-table-column prop="way" label="考试方式" align="center" />
      <!-- <el-table-cloumn label="考试时间" align="center" /> -->
      <el-table-column prop="status" label="状态" />
    </el-table>
    <div>
      <p>课程设置：必考课 16 门 73 学分，加考课 4 门 17 学分。</p>

      <ul>
        <li>1.015 课程含 009、011 课程实验各 2 学分，012 课程实验 1 学分。</li>
        <li>
          2.计算机信息管理专业专科毕业生可直接报考本专业；工科与工程管理类专科（或以上）毕业生报
          考本专业，须加考 201 课程；其他专业专科（或以上）毕业生，须加考
          201、202 两门课程，已 取得相同名称课程考试成绩合格者可申请免考。
        </li>
        <li>
          3.港澳台考生可不考 001、002 两门课程，但须加考 231、232 两门课程。
        </li>
        <li>4.本专业仅接受国民教育序列的专科（或以上）毕业生申办毕业。</li>
      </ul>
    </div>
    <div class="img_group">
      <el-image :src="src4" :preview-src-list="srcList" :initial-index="0" fit="cover" />
      <el-image :src="src10" :preview-src-list="srcList" :initial-index="1" fit="cover" />
    </div>
  </div>
</template>

<script setup lang="ts" name="plan">
import SUBJECT_LIST from "./list";
import src4 from "@/assets/imgs/4.png";
import src10 from "@/assets/imgs/10.png";
const srcList = [src4, src10];
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  .major_info {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    font-weight: bold;
    color: #f00;
    h3 + h3 {
      margin-left: 20px;
    }
  }
  .img_group {
    width: 100%;
    // img {
    //   max-width: 100%;
    // }
  }
}
</style>
