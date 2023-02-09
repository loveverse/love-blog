const Koa = require("koa");
const http = require("http");
const cors = require("koa2-cors");
const { koaBody } = require("koa-body");
const WebSocket = require("ws");
const { APP_PORT, BASE_PATH } = require("./config/index");
const router = require("./router/index");
const Mperson = require("./model/person");

// 创建一个Koa对象
const app = new Koa();
const server = http.createServer(app.callback());
// 同时需要在nginx配置/ws
const wss = new WebSocket.Server({ server, path: BASE_PATH }); // 同一端口监听不同的服务
// 解析请求体(也可以使用koa-body)
app.use(koaBody({ multipart: true }));
// 处理跨域
app.use(cors());
app.use(router.routes());

wss.on("connection", function (ws) {
  let messageIndex = 0;
  ws.on("message", async function (data, isBinary) {
    console.log(data);
    const message = isBinary ? data : data.toString();
    if (JSON.parse(message).type !== "personData") {
      return;
    }
    const result = await Mperson.findAll();
    wss.clients.forEach((client) => {
      messageIndex++;
      client.send(JSON.stringify(result));
    });
  });
  ws.onmessage = (msg) => {
    ws.send(JSON.stringify({ isUpdate: false, message: "pong" }));
  };
  ws.onclose = () => {
    console.log("服务连接关闭");
  };
  ws.send(JSON.stringify({ isUpdate: false, message: "首次建立连接" }));
});

// const path = require('path')
// const staticFiles = require('koa-static')
// app.use(staticFiles(path.join(__dirname + '/dist/')))

server.listen(APP_PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`服务器地址:http://${host}:${port}/findExcerpt`);
});
