<template>
  <template v-if="menuItem.children">
    <el-sub-menu :index="menuItem.path" v-if="menuItem.children.length">
      <template #title>{{ menuItem.title }}</template>
      <template v-for="item in menuItem.children">
        <ComItem :menuItem="item"></ComItem>
      </template>
    </el-sub-menu>
    <el-menu-item
      :index="menuItem.path"
      :disabled="menuItem.permiss === '3' && !isAdmin"
      v-else
      >{{ menuItem.title }}</el-menu-item
    >
  </template>
</template>
<script setup lang="ts" name="ComItem">
// 传递给defineProps的泛型参数本身不能是一个导入的类型，因为vue组件时单独编译的
interface IProps {
  menuItem: {
    [key in string]: any;
  };
}
// 类型推断排除null、undefined
const isAdmin = JSON.parse(localStorage.getItem("userInfo")!)?.is_admin;
const props = defineProps<IProps>();
onMounted(() => {
  // console.log("[ props.item ] >", props.menuItem);
});
</script>
<style lang="scss" scoped></style>
