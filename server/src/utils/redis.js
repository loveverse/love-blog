const Redis = require("redis");

if (!process.env.NODE_ENV) {
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
} else {
  client = null;
}
// client.set("age", 1);

module.exports = client;
