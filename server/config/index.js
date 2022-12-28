// 上线时只需要需改pathBase即可
const pathBase = "pro";
let APP_PORT, APP_HOST, DATA_BASE, USERNAME, PASSWORD;
if (pathBase === "env") {
  APP_PORT = 40001;
  APP_HOST = "localhost";
  DATA_BASE = "verse";
  USERNAME = "verse";
  PASSWORD = "123456";
} else {
  APP_PORT = 40001;
  APP_HOST = "1.15.42.9";
  DATA_BASE = "verse";
  USERNAME = "verse";
  PASSWORD = "123456";
}


module.exports = {
  APP_PORT,
  APP_HOST,
  DATA_BASE,
  USERNAME,
  PASSWORD,
};
