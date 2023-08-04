import { webSocketUrl } from "@/config";
import { t } from "@/lang";

interface ISocketConfig {
  url: string;
  retryTimeout: number;
}
const socketConfig: ISocketConfig = {
  url: webSocketUrl,
  retryTimeout: 20000, // 心跳时间
};

class WS {
  constructor() {}
  websocket: WebSocket | null = null; // websocket连接
  global_callback: ((data: any) => void) | null = null;
  close_callback: (() => void) | null = null; // 连接关闭的通知函数
  timeoutObj: ReturnType<typeof setTimeout> | undefined; // 心跳定时器
  serverTimeoutObj: ReturnType<typeof setTimeout> | undefined; // 服务超时定时关闭
  lockReconnect: boolean = false; //  是否真正建立连接
  timeoutnum: ReturnType<typeof setTimeout> | undefined; // 重新连接的定时器

  // 发送消息
  sendWebsocket(data: any) {
    // 开启状态
    if (this.websocket?.readyState === WebSocket.OPEN) {
      this.socketOnSend(data);
      // 连接中
    } else if (this.websocket?.readyState === WebSocket.CONNECTING) {
      setTimeout(() => {
        this.socketOnSend(data);
      }, 1000);
    } else {
      console.log(t("connectClose"));
    }
  }
  // mounted中初始化
  initWebsocket(
    callback: ((data: any) => void) | null = null,
    close_fun: () => void = () => {},
    url: string = ""
  ) {
    const webUrl = url || socketConfig.url;
    if (typeof WebSocket === "undefined") {
      console.log(t("browserNonsupport"));
      return;
    }
    this.global_callback = callback;
    this.close_callback = close_fun;
    if (this.websocket === null) {
      this.websocket = new WebSocket(webUrl);
      this.socketOnOpen();
      this.socketOnClose();
      this.socketOnError();
      this.socketOnMessage();
    }
  }
  // 关闭websocket函数，组件卸载时销毁
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
    this.websocket?.send(data);
  }
  socketOnOpen() {
    this.websocket?.addEventListener("open", () => {
      console.log(t("connectSuccess"));
      this.start();
    });
  }
  socketOnClose() {
    this.websocket?.addEventListener("close", () => {
      console.log(t("connectClose1"));
      this.close_callback?.();
    });
  }
  socketOnError() {
    this.websocket?.addEventListener("error", () => {
      console.log(t("connectFail"));
      this.reconnect();
    });
  }
  // 数据接收
  socketOnMessage() {
    this.websocket?.addEventListener("message", (e: MessageEvent) => {
      this.global_callback?.(e.data);
      this.reset();
    });
  }
  // 开启心跳
  start() {
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
    this.timeoutObj = setTimeout(() => {
      // 发送一个心跳，后端收到返回一个心跳消息
      if (this.websocket?.readyState === WebSocket.OPEN) {
        // 连接正常，给后端发送指定消息
        this.websocket.send(JSON.stringify({ type: "ping" }));
      } else {
        // 重连
        this.reconnect();
      }
      this.serverTimeoutObj = setTimeout(() => {
        // 超时关闭连接
        this.websocket?.close();
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
      this.initWebsocket();
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
