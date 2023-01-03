import { webSocketUrl } from "@/config";

const socketConfig = {
  url: webSocketUrl,
  retryTimeout: 20000, // 心跳时间
};

class WS {
  constructor() {}
  websocket: any = null; // websocket连接
  global_callback: any = null;
  timeoutObj: any = null; // 心跳定时器
  serverTimeoutObj: any = null; // 服务超时定时关闭
  lockReconnect: boolean = false; //  是否真正建立连接
  timeoutnum: any = null; // 重新连接的定时器

  sendWebsocket(data: any) {
    // 开启状态
    if (this.websocket.readyState === 1) {
      this.socketOnSend(data);
      // 连接中
    } else if (this.websocket.readyState === 0) {
      setTimeout(() => {
        this.socketOnSend(data);
      }, 1000);
    } else {
      setTimeout(() => {
        this.socketOnSend(data);
      }, 1000);
    }
  }
  initWebsocket(callback: any = null, url: string = "") {
    let webUrl = url || socketConfig.url;

    if (typeof WebSocket === "undefined") {
      console.log("您的浏览器不支持WebSocket，无法获取数据");
      return;
    }
    this.global_callback = callback;
    if (this.websocket === null) {
      this.websocket = new WebSocket(webUrl);
      this.socketOnOpen();
      this.socketOnClose();
      this.socketOnError();
      this.socketOnMessage();
    }
  }
  // 关闭websocket函数
  closeWebsocket() {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
  }
  // 发送消息
  socketOnSend(data: any) {
    this.websocket.send(data);
  }
  socketOnOpen() {
    this.websocket.onopen = () => {
      console.log("连接成功");
      this.start();
    };
  }
  socketOnClose() {
    this.websocket.onclose = () => {
      console.log("连接已关闭");
    };
  }
  socketOnError() {
    this.websocket.onerror = () => {
      this.reconnect();
      console.log("连接失败，继续重连");
    };
  }
  // 数据接收
  socketOnMessage() {
    this.websocket.onmessage = (e: any) => {
      this.global_callback(e.data);
      this.reset();
    };
  }
  // 开启心跳
  start() {
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
    this.timeoutObj = setTimeout(() => {
      // 发送一个心跳，后端收到返回一个心跳消息
      if (this.websocket.readyState === 1) {
        // 连接正常，给后端发送指定消息
        this.websocket.send(JSON.stringify({ type: "心跳包" }));
      } else {
        // 重连
        this.reconnect();
      }
      this.serverTimeoutObj = setTimeout(() => {
        // 超时关闭连接
        this.websocket.close();
      }, socketConfig.retryTimeout);
    }, socketConfig.retryTimeout);
  }
  // 重连
  reconnect() {
    if (this.lockReconnect) {
      return;
    }
    // 没有连接上向下执行
    this.lockReconnect = true;
    this.timeoutnum && clearTimeout(this.timeoutnum);
    this.timeoutnum = setTimeout(() => {
      Ws.initWebsocket();
      this.lockReconnect = false;
    }, 5000);
  }
  // 重置心跳
  reset() {
    // 清除时间
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    // 重启心跳
    this.start();
  }
}
const Ws = new WS();

export default Ws;
