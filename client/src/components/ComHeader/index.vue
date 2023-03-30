<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    :router="state.flag"
  >
    <template v-if="state.flag">
      <template v-for="item in ROUTER_LIST">
        <ComItem :menuItem="item"></ComItem>
      </template>
    </template>
    <el-menu-item
      v-else
      index="0"
      @click="() => (state.showAside = true)"
      class="unfold"
    >
      <template #title>
        <el-icon><Expand /></el-icon>
        <span>展开</span>
      </template>
    </el-menu-item>

    <div class="flex-grow" />

    <div class="btn_login">
      <el-dropdown @command="toggleLanguage">
        <span class="el-dropdown-link">
          多语言
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="en">English</el-dropdown-item>
            <el-dropdown-item command="zh-CN">简体中文</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-switch
        v-model="state.isDark"
        inline-prompt
        active-icon="Moon"
        inactive-icon="Sunny"
        class="theme_toggle"
      />
      <el-button
        v-if="!userInfo"
        type="primary"
        @click="state.registerDiaVis = true"
        >登录</el-button
      >
      <el-dropdown v-else>
        <span class="user_info">
          <span class="name">{{ userInfo.user_name }}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-link
                type="primary"
                target="_blank"
                href="https://github.com/loveverse/love-blog"
                >项目地址</el-link
              >
            </el-dropdown-item>
            <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-menu>
  <el-drawer
    v-model="state.showAside"
    direction="ltr"
    :with-header="false"
    :before-close="() => (state.showAside = false)"
    :size="200"
    class="aside-drawer"
  >
    <el-menu
      :default-active="$route.path"
      mode="vertical"
      :ellipsis="false"
      router
    >
      <template v-for="item in ROUTER_LIST">
        <ComItem :menuItem="item"></ComItem>
      </template>
    </el-menu>
  </el-drawer>
  <el-dialog
    v-model="state.registerDiaVis"
    title="注册/登录"
    width="300px"
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
import type { FormInstance } from "element-plus";
import { Expand } from "@element-plus/icons-vue";
import { useDark } from "@vueuse/core";
import debounce from "lodash/debounce";
import { i18n } from "@/lang";
import { useLangStore } from "@/store";
import { reqRegisterUser } from "@/api/login";

import ROUTER_LIST from "./list";
import { useRouter } from "vue-router";
// interface IState {
//   menuList: object[];
//   regForm: {
//     userName: string;
//     password: string;
//   };
//   regFormRules: object;
//   registerDiaVis: Boolean;
//   // userInfo: {
//   //   [key in string]: any;
//   // };
// }

const isDark = useDark();

const state = reactive({
  regForm: {
    userName: "",
    password: "",
  },
  regFormRules: {
    userName: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  },
  registerDiaVis: false, // 登录注册弹窗
  flag: true, // 小屏适配
  showAside: false, // 显示抽屉
  isDark,
});
const registerRef = ref<FormInstance>();

const userInfo = computed(() => {
  return JSON.parse(localStorage.getItem("userInfo")!);
});
const router = useRouter();
const store = useLangStore();

// 切换语言
const toggleLanguage = (val: any) => {

  i18n.global.locale.value = val;
  store.updateLocale(val);
  localStorage.setItem("lang", val);
  router.go(0);
  // window.location.reload();
};
const handleRegister = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const params = {
        ...state.regForm,
      };
      const result = await reqRegisterUser(params);

      if (result.code === 200) {
        ElMessage.success(result.msg);
        state.registerDiaVis = false;
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userInfo", JSON.stringify(result.data.userInfo));
        window.location.reload();
      } else {
        ElMessage.error(result.msg);
      }
    } else {
      return false;
    }
  });
};
const loginOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  ElMessage.success("退出成功");
  window.location.reload();
};

onMounted(() => {
  let w = window.outerWidth;
  state.flag = w > 768;
  window.onresize = debounce(() => {
    let w = window.outerWidth;
    state.flag = w > 768;
  }, 300);
});
</script>
<style lang="scss" scoped>
.el-menu-demo {
  transition: all 0.3s;
  .flex-grow {
    flex-grow: 1;
  }

  .btn_login {
    display: flex;
    align-items: center;
    .theme_toggle {
      margin: 0 20px;
    }
    .user_info {
      display: flex;
      align-items: center;
      cursor: pointer;
      .name {
        margin-right: 5px;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .unfold {
    padding: 0 5px 0 0;
  }
}
</style>
<!-- 使用scoped无法生效 -->
<style lang="scss">
// 这里样式会在全局生效
.aside-drawer {
  .el-drawer__body {
    padding: 0;
  }
}
</style>
