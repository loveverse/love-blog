import { createPinia } from "pinia";
const store = createPinia();
// 以后引用的时候可以直接from '@/store'
export { useLangStore } from "./lang";
export default store;
