const url: string = "ws://localhost: 40001";
const webScoket = new WebSocket(url);
webScoket.onopen = function () {
  console.log("[ 11 ] >", 11);
};
