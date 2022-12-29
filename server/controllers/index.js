const hotword = require("./hotword");
const issue = require("./issue");
const person = require("./person");
const user = require("./user");
const upload = require('./upload');
// wss.on("connection", function connection(ws) {
//   ws.on("message", async function incoming(message) {
//     // 消息id
//     let messageIndex = 0;
//     const result = await DB.query(findExcerptSql);
//     wss.clients.forEach((client) => {
//       messageIndex++;
//       client.send(JSON.stringify(result));
//     });
//   });
// });
module.exports = {
  hotword,
  issue,
  person,
  user,
  upload
};
