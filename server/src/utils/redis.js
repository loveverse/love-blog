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
// redis数据的存和取
// const setRedisData = {
//   setData: (key, value, expire = 60 * 5) => {
//     return new Promise((resolve, reject) => {
//       client.set(
//         key,
//         typeof value === "object" ? JSON.stringify(value) : value,
//         function name(err, result) {
//           if (err) {
//             reject(err);
//           }
//           if (!isNaN(expire) && expire > 0) {
//             client.expire(key, expire);
//           }
//           resolve(result);
//         }
//       );
//     });
//   },
//   getData: (key) => {
//     return new Promise((resolve, reject) => {
//       client.get(key, function (err, result) {
//         if (err) {
//           reject(err);
//         }
//         if (result) {
//           try {
//             resolve(JSON.parse(result));
//           } catch (error) {
//             resolve(result);
//           }
//         } else {
//           resolve(result);
//         }
//       });
//     });
//   },
// };
module.exports = client;
