const Koa = require("koa");
const http = require("http");
const cors = require("koa2-cors");
const WebSocket = require("ws");
const { koaBody } = require("koa-body");
const { APP_PORT, APP_BASE_PATH } = require("./src/config/index");
const router = require("./src/router/index");
const seq = require("./src/mysql/sequelize");
const PersonModel = require("./src/models/person");
const Mperson = PersonModel(seq);

// 创建一个Koa对象
const app = new Koa();
const server = http.createServer(app.callback());
// 同时需要在nginx配置/ws
const wss = new WebSocket.Server({ server, path: APP_BASE_PATH }); // 同一端口监听不同的服务
// 使用了代理
app.proxy = true;
// 处理跨域
app.use(cors());
// 解析请求体(也可以使用koa-body)
app.use(
  koaBody({
    multipart: true,
    // textLimit: "1mb",  // 限制text body的大小，默认56kb
    formLimit: "10mb", // 限制表单请求体的大小，默认56kb,前端报错413
    // encoding: "gzip",    // 前端报415
    formidable: {
      // uploadDir: path.join(__dirname, "./static/"), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      // 最大文件上传大小为512MB（如果使用反向代理nginx，需要设置client_max_body_size）
      maxFieldsSize: 512 * 1024 * 1024,
    },
  })
);
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
  const host = process.env.APP_REDIS_HOST;
  const port = process.env.APP_PORT;
  console.log(
    `环境:${
      process.env.NODE_ENV ? "开发环境" : "生产环境"
    },服务器地址:http://${host}:${port}/findExcerpt`
  );
});
module.exports = server;
