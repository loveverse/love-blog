const Redis = require("redis");
const client = Redis.createClient({
  host: "localhost",
  port: 6379,
});

client.connect();
client.on("connect", () => {
  console.log("Redis client connected");
});
// 连接错误处理
client.on("error", (err) => {
  console.error(err);
});
// client.set("age", 1);

module.exports = client;
