// 上线时只需要需运行npm run pro

let APP_PORT,
  APP_HOST,
  DATA_BASE,
  USERNAME,
  PASSWORD,
  BASE_PATH,
  JWT_SECRET,
  FILE_PATH,
  NETWORK_PATH;
// 使用set NODE_ENV会多一个空格
if (process.env.NODE_ENV === "development " || !process.env.NODE_ENV) {
  APP_PORT = 40001;
  APP_HOST = "1.15.42.9";
  DATA_BASE = "verse";
  USERNAME = "verse";
  PASSWORD = "123456";
  BASE_PATH = "/";
  JWT_SECRET = "LOVE-TOKEN";
  FILE_PATH = "";
  NETWORK_PATH = "blob:http://192.168.10.50:40001/";
} else {
  APP_PORT = 40001; // 服务监听端口
  APP_HOST = "1.15.42.9"; // 数据库ip地址
  DATA_BASE = "verse"; // 数据库名
  USERNAME = "verse"; // 用户名
  PASSWORD = "123456"; // 密码
  BASE_PATH = "/socket";
  JWT_SECRET = "LOVE-TOKEN";
  FILE_PATH = "/www/wwwroot/note.loveverse.top/static"; // 保存文件的绝对路径
  NETWORK_PATH = "https://note.loveverse.top/static/"; // 网络url地址
}

module.exports = {
  APP_PORT,
  APP_HOST,
  DATA_BASE,
  USERNAME,
  PASSWORD,
  BASE_PATH,
  JWT_SECRET,
  FILE_PATH,
  NETWORK_PATH,
};
