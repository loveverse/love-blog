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
        <span>{{ t("expansion") }}</span>
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
            <el-dropdown-item
              v-for="item in languageList"
              :key="item.name"
              :command="item.name"
              >{{ item.text }}</el-dropdown-item
            >
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
        >{{ t("login") }}</el-button
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
                >{{ t("projectAddress") }}</el-link
              >
            </el-dropdown-item>
            <el-dropdown-item @click="loginOut">{{
              t("logOut")
            }}</el-dropdown-item>
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
    :title="t('registerOrLogin')"
    width="320px"
    center
  >
    <el-form
      ref="registerRef"
      :model="state.regForm"
      status-icon
      :rules="state.regFormRules"
      label-position="left"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="t('userName')" prop="userName">
        <el-input
          v-model="state.regForm.userName"
          type="text"
          autocomplete="off"
          :placeholder="t('place.userName')"
        />
      </el-form-item>
      <el-form-item :label="t('password')" prop="password">
        <el-input
          v-model="state.regForm.password"
          type="password"
          autocomplete="off"
          :placeholder="t('place.password')"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.registerDiaVis = false">{{
          t("cancel")
        }}</el-button>
        <el-button type="primary" @click="handleRegister(registerRef)">
          {{ t("register") }}
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
import { i18n, t } from "@/lang";
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
    userName: [
      { required: true, message: t("rule.userName"), trigger: "blur" },
    ],
    password: [
      { required: true, message: t("rule.password"), trigger: "blur" },
    ],
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
// 过滤已使用语言
const languageList = computed(() => {
  const language = [
    {
      name: "zh-CN",
      text: "简体中文",
    },
    {
      name: "en",
      text: "English",
    },
  ];
  return language.filter((k) => i18n.global.locale.value !== k.name);
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
  ElMessage.success(t("message.logOutSuccess"));
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
