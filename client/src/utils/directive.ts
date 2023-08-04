import { DirectiveBinding, VNode } from "vue";
const focus = {
  mounted: function (el: HTMLElement) {
    if (el.tagName == "INPUT") {
      el.focus();
    } else if (el.tagName === "TEXTEA") {
    } else {
      const input = el.querySelector("input");
      input && input.focus();
    }
  },
  updated: function (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    if (el.tagName == "INPUT") {
      el.focus();
    } else {
      // // inserted是插入到dom时才会触发，上面使用v-show只是隐藏，不会触发指令中的函数
      // vnode.context.nextTick(() => {
      const input = el.querySelector("input");
      input && input.focus();
      // });
    }
  },
};

export default {
  install(Vue: any) {
    Vue.directive("focus", focus);
  },
};
