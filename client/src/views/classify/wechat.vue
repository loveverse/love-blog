<template>
  <div class="wrapper">
    <div class="header">
      <el-button type="primary" @click="handleOperation('add')">添加</el-button>
      <el-button type="info" @click="handleMaxUser">统计</el-button>
      <el-input
        v-model.trim="state.searchVal"
        :prefix-icon="Search"
        clearable
        placeholder="请输入uid/wx"
        @input="handleSearch"
      />
    </div>
    <el-table
      :data="state.userInfoList"
      style="margin: 20px 0"
      v-loading="loading"
    >
      <el-table-column type="index" label="序号" width="80" align="center">
        <template #default="{ row, $index }">
          <span
            :style="{ backgroundColor: row.uid === '3677719209' ? 'red' : '' }"
            >{{ (state.page - 1) * state.size + $index + 1 }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="uid" label="uid"> </el-table-column>
      <el-table-column prop="qq" label="qq"> </el-table-column>
      <el-table-column prop="wx" label="wx"> </el-table-column>
      <el-table-column prop="status" label="账号状态"> </el-table-column>
      <el-table-column prop="text" label="描述" min-width="300">
        <template #default="{ row }">
          <div v-if="row.text.my">我：{{ row.text.my }}</div>
          <div v-if="row.text.qiqi">qiqi：{{ row.text.qiqi }}</div>
          <div v-if="row.text.muqin">muqin：{{ row.text.muqin }}</div>
          <div v-if="row.text.yuequ">yuequ：{{ row.text.yuequ }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template #default="{ row }">
          <el-button
            type="warning"
            plain
            size="small"
            @click="handleOperation('edit', row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            plain
            size="small"
            @click="handleOperation('del', row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      @current-change="getUserInfoList"
      :current-page="state.page"
      :page-size="state.size"
      :pager-count="5"
      layout="->,prev, pager, next, total"
      :total="state.total"
    >
    </el-pagination>
    <el-dialog v-model="state.userInfoDia" width="60%" title="添加">
      <el-form :model="state.form" label-width="100" ref="formRef">
        <el-form-item label="uid">
          <!-- <el-select
            v-model="state.form.uid"
            filterable
            remote
            clearable
            allow-create
            placeholder="请输入uid"
            remote-show-suffix
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in state.options"
              :key="item.id"
              :label="item.uid"
              :value="item.id"
            />
          </el-select> -->
          <el-autocomplete
            v-model.trim="state.form.uid"
            placeholder="请输入uid"
            clearable
            value-key="uid"
            class="uid"
            :fetch-suggestions="remoteMethod"
          />
          <el-tag
            size="large"
            :type="state.options.length ? 'success' : 'danger'"
            >{{ state.options.length ? "已查到" : "未查到" }}</el-tag
          >
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="昵称">
              <el-input
                v-model="state.form.name"
                placeholder="请输入昵称"
                clearable
              />
            </el-form-item>
            <el-form-item label="关联wx">
              <el-input
                v-model="state.form.wx"
                placeholder="请输入wx"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="真实性">
              <el-select v-model="state.form.isFraud">
                <el-option
                  v-for="item in state.authList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关联qq">
              <el-input
                v-model="state.form.qq"
                placeholder="请输入qq"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="我的描述">
          <el-input
            v-model="state.form.textInfo.my"
            placeholder="请输入"
            type="textarea"
            clearable
          />
        </el-form-item>
        <el-form-item label="qiqi描述">
          <el-input
            v-model="state.form.textInfo.qiqi"
            placeholder="请输入"
            type="textarea"
            clearable
          />
        </el-form-item>
        <el-form-item label="muqin描述">
          <el-input
            v-model="state.form.textInfo.muqin"
            placeholder="请输入"
            type="textarea"
            clearable
          />
        </el-form-item>
        <el-form-item label="yuequ描述">
          <el-input
            v-model="state.form.textInfo.yuequ"
            placeholder="请输入"
            type="textarea"
            clearable
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.userInfoDia = false">取消</el-button>
          <el-button type="primary" @click="handSaveUserInfo(formRef)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="wechat">
import debounce from "lodash/debounce";
import { FormInstance } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import {
  reqUserInfo,
  reqAddUserInfo,
  reqFindOneUserInfo,
  reqDeleteUser,
  reqEditUser,
  reqMaxUser,
} from "@/api/wechat";

interface IState {
  userInfoList: {
    [key in string]: any;
  };
  page: number;
  size: number;
  total: number;
  timer: NodeJS.Timer | undefined;
  userInfoDia: boolean;
  options: { id: string; uid: string }[];
  searchVal: string | number;
  form: {
    [key in string]: any;
  };
  authList: { value: string | number; label: string }[];
}
const state = reactive<IState>({
  userInfoList: [],
  page: 1,
  size: 20,
  total: 0,
  timer: null,
  userInfoDia: false,
  options: [],
  searchVal: "",
  form: {
    id: "",
    uid: "",
    name: "",
    wx: "",
    qq: "",
    isFraud: 1,
    textInfo: {
      my: "",
      qiqi: "",
      muqin: "",
      yuequ: "",
    },
  },
  authList: [
    {
      value: 0,
      label: "真人",
    },
    {
      value: 1,
      label: "骗子",
    },
  ],
});
const loading = ref(false);
const formRef = ref<FormInstance>();

const handleMaxUser = async () => {
  const params = {
    page: 1,
    size: 10,
  };
  const result = await reqMaxUser(params);
  if (result.code === 200) {
    console.log(result.data);
  } else {
    ElMessage.error(result.msg);
  }
};
const handleOperation = (type: string, info: any = null) => {
  if (type === "del") {
    deleteUser(info.id);
  } else if (type === "edit") {
    state.form = { ...info };
    state.form.textInfo = { ...state.form.text };
    state.userInfoDia = true;
  } else {
    state.form.uid = "";
    state.form.id = "";
    state.form.wx = "";
    state.form.qq = "";
    state.form.name = "";
    state.form.isFraud = 1;
    state.userInfoDia = true;
  }
};
const handleSearch = debounce(function (val: string | number) {
  getUserInfoList();
}, 300);

const deleteUser = async (id: string) => {
  const result = await reqDeleteUser({ id });
  if (result.code === 200) {
    ElMessage.success("删除成功");
    getUserInfoList(state.page);
  } else {
    ElMessage.error(result.msg);
  }
};
// 远程搜索
const remoteMethod = async (queryString: string, cb: (arg: any) => void) => {
  if (queryString) {
    await handleOneUserInfo(queryString);
    clearTimeout(state.timer);
    state.timer = setTimeout(() => {
      cb(state.options);
    }, 300);
  } else {
    state.options = [];
  }
};
const handleOneUserInfo = async (uid: string) => {
  const result = await reqFindOneUserInfo({ uid });
  if (result.code === 200) {
    state.options = result.data;
  } else {
    ElMessage.error(result.msg);
  }
};

const getUserInfoList = async (page = 1) => {
  state.page = page;
  const params = {
    page: state.page,
    size: state.size,
    searchVal: state.searchVal,
  };
  loading.value = true;
  const result = await reqUserInfo(params);
  if (result.code === 200) {
    state.total = +result.data.total;
    state.userInfoList = result.data.data;
  } else {
    ElMessage.error(result.msg);
  }
  loading.value = false;
};

const handSaveUserInfo = async (formEl: FormInstance | undefined) => {
  await formEl?.validate(async (valid, fieIds) => {
    if (valid) {
      const params = { ...state.form };
      const commonFn = state.form.id ? reqEditUser : reqAddUserInfo;
      const result = await commonFn(params);
      if (result.code === 200) {
        state.userInfoDia = false;
        ElMessage.success(state.form.id ? "编辑成功" : "添加成功");
        getUserInfoList(state.page);
      } else {
        ElMessage.error(result.msg);
      }
    } else {
    }
  });
};
onMounted(() => {
  getUserInfoList();
});
</script>
<style lang="scss" scoped>
.wrapper {
  .header {
    display: flex;
    .el-input {
      width: 280px;
    }
    .el-button + .el-button {
      margin: 0 20px;
    }
  }
  :deep(.uid) {
    width: 200px;
    margin-right: 5px;
  }
}
</style>
