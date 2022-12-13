let basePath = "dev";
let domain: string;
if (basePath === "dev") {
  domain = "http://localhost:40001";
} else {
  // 线上环境
  domain = "http://1.15.42.9:40001";
}

export { domain };
