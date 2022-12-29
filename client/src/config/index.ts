let domain: string;
console.log("[ import. ] >", import.meta.env.DEV);
if (import.meta.env.DEV) {
  domain = "http://localhost:40001";
} else {
  // 线上环境
  domain = "https://api.loveverse.top";
}

export { domain };
