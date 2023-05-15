/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare namespace NodeJS {
  type Timer = any;
}
declare module "*.scss";

// declare module 'vue-cropperjs';
