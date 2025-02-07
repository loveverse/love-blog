let domain: string, webSocketUrl: string, previewUrl: string;
console.log("[ import. ] >", import.meta.env.DEV);
if (import.meta.env.DEV) {
  domain = "http://localhost:40001";
  webSocketUrl = "ws://localhost:40001";
  previewUrl = "http://loveverse.top/onlinePreview/onlinePreview";
} else {
  // 线上环境
  domain = "http://api.loveverse.top";
  webSocketUrl = "ws://api.loveverse.top/socket";
  previewUrl = "http://loveverse.top/onlinePreview/onlinePreview";
}

export { domain, webSocketUrl, previewUrl };
