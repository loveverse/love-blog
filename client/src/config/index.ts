let domain: string, webSocketUrl: string, previewUrl: string;
console.log("[ import. ] >", import.meta.env.DEV);
if (import.meta.env.DEV) {
  domain = "http://localhost:40001";
  webSocketUrl = "ws://localhost:40001";
  previewUrl = "https://1.15.42.9:8012/onlinePreview";
} else {
  // 线上环境
  domain = "https://api.loveverse.top";
  webSocketUrl = "wss://api.loveverse.top/socket";
  previewUrl = "https://1.15.42.9:8012/onlinePreview";
}

export { domain, webSocketUrl, previewUrl };
