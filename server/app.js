const Koa = require("koa");
const http = require("http");
const cors = require("koa2-cors");
// const WebSocket = require("ws");
const router = require("./interface/index");

// 创建一个Koa对象
const app = new Koa();
const server = http.createServer(app.callback());
// const wss = new WebSocket.Server({ server }); // 同一端口监听不同的服务
// 处理跨域
app.use(cors());
app.use(router.routes());

// const path = require('path')
// const staticFiles = require('koa-static')
// app.use(staticFiles(path.join(__dirname + '/dist/')))

server.listen(40001);
console.log("服务器地址:http://localhost/findExcerpt");
