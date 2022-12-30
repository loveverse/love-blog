const url: string = "ws://localhost: 40001";

let websocket: any = null;
let global_callback: any = null;
function createWebSocket(callback: Function) {
  if (websocket === null || typeof websocket !== WebSocket) {
    initWebSocket(callback);
  }
}

function initWebSocket(callback: Function) {
  global_callback = callback;
  websocket = new WebSocket(url);
  websocket.onmessage = function (e) {
    websocketOnMessage(e);
  };
  websocket.onclose = function (e) {
    websocketClose(e);
  };
  websocket.onopen = function (e) {
    websocketOpen(e);
  };
  websocket.onerror = function (e) {
    console.log("webSocket连接发生错误");
  };
}
// 数据接收
function websocketOnMessage(msg) {}
function websocketClose(e: any) {
  console.log("连接关闭", e.code);
}
function websocketOpen(e) {
  console.log("连接打开");
}

// 实际调用的方法
function sendSocket(data){
  if(websocket.readyState === websocket.open){
    
  }
}