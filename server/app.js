const Koa = require("koa");
const http = require("http");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const WebSocket = require("ws");
const { APP_PORT } = require("./config/index");
const router = require("./router/index");

// 创建一个Koa对象
const app = new Koa();
const server = http.createServer(app.callback());
const wss = new WebSocket.Server({ server }); // 同一端口监听不同的服务

// 解析请求体(也可以使用koa-body)
app.use(bodyParser());
// 处理跨域
app.use(cors());
app.use(router.routes());

wss.on("connection", function (ws) {
  try {
    ws.on("message", async function incoming(message) {
      console.log("[ message ] >", message.toString());
      if (!message.toString()) {
        return;
      }
      // const obj = JSON.parse(message);
      console.log("[ obj ] >", message);
    });
    ws.send("服务器发送的消息：send");
  } catch (error) {}
});

// const path = require('path')
// const staticFiles = require('koa-static')
// app.use(staticFiles(path.join(__dirname + '/dist/')))

server.listen(APP_PORT);
console.log(`服务器地址:http://localhost:40001/findExcerpt`);
