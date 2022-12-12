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
      <el-button type="primary">登录</el-button>
    </div>
  </el-menu>
</template>

<script lang="ts" setup name="ComHeader">
interface IState {
  menuList: object[];
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
    {
      icon: "",
      path: "/home/issue",
      title: "学习问题",
      permiss: "1",
      children: [],
    },
  ],
});
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
