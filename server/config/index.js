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
if (process.env.NODE_ENV === "development ") {
  APP_PORT = 40001;
  APP_HOST = "1.15.42.9";
  DATA_BASE = "verse";
  USERNAME = "verse";
  PASSWORD = "123456";
  BASE_PATH = "/";
  JWT_SECRET = "LOVE-TOKEN";
  FILE_PATH = "";
  NETWORK_PATH = "";
} else {
  APP_PORT = 40001; // 服务监听端口
  APP_HOST = "1.15.42.9"; // 数据库ip地址
  DATA_BASE = "verse"; // 数据库名
  USERNAME = "verse"; // 用户名
  PASSWORD = "123456"; // 密码
  BASE_PATH = "/socket";
  JWT_SECRET = "LOVE-TOKEN";
  FILE_PATH = "/www/wwwroot/note.loveverse.top/static";
  NETWORK_PATH = "https://note.loveverse.top/static/";
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
// 使用vue中的过渡组件，当过渡组件在根标签下时，同时在多级路由后，过渡动画不生效问题