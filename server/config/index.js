// 上线时只需要需改pathBase即可
const pathBase = "env";
let APP_PORT, APP_HOST, DATA_BASE, USERNAME, PASSWORD,BASE_PATH;
if (pathBase === "env") {
  APP_PORT = 40001;
  APP_HOST = "1.15.42.9";
  DATA_BASE = "verse";
  USERNAME = "verse";
  PASSWORD = "123456";
  BASE_PATH = "/";
} else {
  APP_PORT = 40001; // 服务监听端口
  APP_HOST = "1.15.42.9"; // 数据库ip地址
  DATA_BASE = "verse"; // 数据库名
  USERNAME = "verse"; // 用户名
  PASSWORD = "123456"; // 密码
  BASE_PATH = "/socket";
}

module.exports = {
  APP_PORT,
  APP_HOST,
  DATA_BASE,
  USERNAME,
  PASSWORD,
  BASE_PATH,
};
