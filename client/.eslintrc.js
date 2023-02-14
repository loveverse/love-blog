module.exports = {
  root: true, // 若有多个配置规则，向外查找到有 root:true 的时候就终止查找，有多个配置则配置会叠加。
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  //   解析vue
  parser: "vue-eslint-parser",

  parserOptions: {
    // 解析的语法环境有哪些
    ecmaVersion: "latest",
    sourceType: "module",
    // 解析ts
    parser: "@typescript-eslint/parser",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {},
};
