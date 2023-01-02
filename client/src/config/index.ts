let domain: string, webSocketUrl: string;
console.log("[ import. ] >", import.meta.env.DEV);
if (import.meta.env.DEV) {
  domain = "http://localhost:40001";
  webSocketUrl = "ws://localhost:40001";
} else {
  // 线上环境
  domain = "https://api.loveverse.top";
  webSocketUrl = "wss://api.loveverse.top/ws";
}

export { domain, webSocketUrl };
