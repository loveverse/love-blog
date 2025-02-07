const Redis = require("redis");
const {
  APP_REDIS_HOST,
  APP_REDIS_PORT,
  APP_REDIS_PASSWORD,
  APP_REDIS_DB,
} = require("../config");

// const client = Redis.createClient({
//   url: "redis://" + APP_REDIS_HOST + ":" + APP_REDIS_PORT,
//   host: APP_REDIS_HOST,
//   port: APP_REDIS_PORT,
//   password: APP_REDIS_PASSWORD,
//   database: APP_REDIS_DB,
// });

// client.connect();
// client.on("connect", () => {
//   console.log("Redis client connected");
// });
// // 连接错误处理
// client.on("error", (err) => {
//   console.error(err);
// });

// client.set("age", 1);

// module.exports = client
module.exports = {
  get() {
    return null;
  },
};
