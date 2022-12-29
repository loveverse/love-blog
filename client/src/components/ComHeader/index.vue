<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    router
    @select="handleSelect"
  >
    <template v-for="item in state.menuList">
      <ComItem :menuItem="item"></ComItem>
    </template>
    <div class="flex-grow" />
    <div class="btn_login">
      <el-button type="primary" @click="state.registerDiaVis = true"
        >登录</el-button
      >
    </div>
  </el-menu>
  <el-dialog
    v-model="state.registerDiaVis"
    title="注册/登录"
    width="30%"
    center
  >
    <el-form
      ref="registerRef"
      :model="state.regForm"
      status-icon
      :rules="state.regFormRules"
      label-position="left"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input
          v-model="state.regForm.userName"
          type="text"
          autocomplete="off"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="state.regForm.password"
          type="password"
          autocomplete="off"
          placeholder="请输入密码"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.registerDiaVis = false">取消</el-button>
        <el-button type="primary" @click="handleRegister(registerRef)">
          注册
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="ComHeader">
import { reqRegisterUser } from "@/api/login";
import type { FormInstance } from "element-plus";
interface IState {
  menuList: object[];
  regForm: {
    userName: string;
    password: string;
  };
  regFormRules: object;
  registerDiaVis: Boolean;
}
const state = reactive<IState>({
  // 没写children，自动隐藏
  menuList: [
    {
      icon: "",
      path: "/home/person",
      title: "首页",
      permiss: "1",
      children: [],
    },
    {
      icon: "",
      path: "/home/hotword",
      title: "网易热评",
      permiss: "1",
      children: [],
    },
    {
      icon: "",
      path: "/home/issue",
      title: "学习问题",
      permiss: "1",
      children: [],
    },
    {
      icon: "",
      path: "/aaa",
      title: "未来目录",
      permiss: "1",
      children: [
        {
          icon: "",
          path: "3",
          title: "二级目录",
          permiss: "2",
          children: [
            {
              icon: "",
              path: "4",
              title: "三级目录",
              permiss: "3",
              children: [],
            },
          ],
        },
        {
          icon: "",
          path: "5",
          title: "二级目录",
          permiss: "4",
          children: [],
        },
      ],
    },
  ],
  regForm: {
    userName: "",
    password: "",
  },
  regFormRules: {
    userName: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  },
  registerDiaVis: false,
});
const registerRef = ref<FormInstance>();

const handleRegister = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const params = {
        ...state.regForm,
      };
      const result = await reqRegisterUser(params);
      if (result.code === 200) {
        ElMessage.success("注册成功");
        state.registerDiaVis = false;
      }
    } else {
      return false;
    }
  });
};
onMounted(() => {
  // console.log("[ state.menuList ] >", state.menuList);
});
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}
.btn_login {
  display: flex;
  align-items: center;
}
</style>
