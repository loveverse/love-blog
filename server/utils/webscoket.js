const WebSocketServer = require("ws").Server;
const { APP_PORT } = require("../config/index");
const wss = new WebSocketServer({ port: APP_PORT });

wss.on("connection", function (ws) {
  ws.on("message", function (message) {
    console.log("[ message ] >", message);
    if (!message) {
      return;
    }
    const obj = JSON.parse(message);
    console.log("[ obj ] >", obj);
  });
  ws.send("send");
});
