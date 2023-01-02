// const url: string = ;

let websocket: any = null; // websocket连接
let global_callback: any = null;
let timeoutObj: any = null; // 心跳定时器
let serverTimeoutObj: any = null; // 服务超时定时关闭
let lockReconnect: boolean = false; //  是否真正建立连接
let timeoutnum: any = null; // 重新连接的定时器
const socketConfig = {
  url: "ws://localhost:40001",
  retryTimeout: 20000, // 心跳时间
};

class WS {
  constructor() {}
  sendWebsocket(data: any) {
    // 开启状态
    if (websocket.readyState === 1) {
      socketOnSend(data);
      // 连接中
    } else if (websocket.readyState === 0) {
      setTimeout(() => {
        socketOnSend(data);
      }, 1000);
    } else {
      setTimeout(() => {
        socketOnSend(data);
      }, 1000);
    }
  }
  initWebsocket(callback: any = null, url: string = "") {
    let webUrl = url || socketConfig.url;

    if (typeof WebSocket === "undefined") {
      console.log("您的浏览器不支持WebSocket，无法获取数据");
      return;
    }
    global_callback = callback;
    if (websocket === null) {
      websocket = new WebSocket(webUrl);
      socketOnOpen();
      socketOnClose();
      socketOnError();
      socketOnMessage();
    }
  }
  // 关闭websocket函数
  closeWebsocket() {
    if (websocket) {
      websocket.close();
    }
    clearTimeout(timeoutObj);
    clearTimeout(serverTimeoutObj);
  }
}
const Ws = new WS();
// 发送消息
function socketOnSend(data: any) {
  websocket.send(data);
}
function socketOnOpen() {
  console.log(111, websocket);
  websocket.onopen = () => {
    console.log("连接成功");
    start();
  };
}
function socketOnClose() {
  websocket.onclose = () => {
    console.log("连接已关闭");
  };
}
function socketOnError() {
  websocket.onerror = () => {
    reconnect();
    console.log("连接失败，继续重连");
  };
}
// 数据接收
function socketOnMessage() {
  websocket.onmessage = (e: any) => {
    global_callback(e.data);
    reset();
  };
}

// 开启心跳
function start() {
  timeoutObj && clearTimeout(timeoutObj);
  serverTimeoutObj && clearTimeout(serverTimeoutObj);
  timeoutObj = setTimeout(() => {
    // 发送一个心跳，后端收到返回一个心跳消息
    if (websocket.readyState === 1) {
      // 连接正常，给后端发送指定消息
      websocket.send("心跳包");
    } else {
      // 重连
      reconnect();
    }
    serverTimeoutObj = setTimeout(() => {
      // 超时关闭连接
      websocket.close();
    }, socketConfig.retryTimeout);
  }, socketConfig.retryTimeout);
}

// 重连
function reconnect() {
  if (lockReconnect) {
    return;
  }
  // 没有连接上向下执行
  lockReconnect = true;
  timeoutnum && clearTimeout(timeoutnum);
  timeoutnum = setTimeout(() => {
    Ws.initWebsocket();
    lockReconnect = false;
  }, 5000);
}

// 重置心跳
function reset() {
  // 清除时间
  clearTimeout(timeoutObj);
  clearTimeout(serverTimeoutObj);
  // 重启心跳
  start();
}

export default Ws;
