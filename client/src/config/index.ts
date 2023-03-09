let domain: string, webSocketUrl: string, previewUrl: string;
console.log("[ import. ] >", import.meta.env.DEV);
if (import.meta.env.DEV) {
  domain = "http://localhost:40001";
  webSocketUrl = "ws://localhost:40001";
  previewUrl = "https://loveverse.top/onlinePreview/onlinePreview";
  // previewUrl = "http://192.168.1.5:8012/onlinePreview";
} else {
  // 线上环境
  domain = "https://api.loveverse.top";
  webSocketUrl = "wss://api.loveverse.top/socket";
  previewUrl = "https://loveverse.top/onlinePreview/onlinePreview";
}

export { domain, webSocketUrl, previewUrl };
