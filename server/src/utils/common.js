function getClientIP(req) {
  let ip =
    req.headers["x-forwarded-for"] || // 判断是否有反向代理 IP
    req.ip ||
    req.connection?.remoteAddress || // 判断 connection 的远程 IP
    req.socket?.remoteAddress || // 判断后端的 socket 的 IP
    req.connection?.socket?.remoteAddress ||
    "";
  if (ip) {
    ip = ip.replace("::ffff:", "");
  }
  return ip;
}

// 文件大小转换
function convertorFileSize(size) {
  let data = "";
  if (size < 1 * 1024) {
    //如果小于0.1KB转化成B
    data = size.toFixed(2) + "B";
  } else if (size < 1 * 1024 * 1024) {
    //如果小于0.1MB转化成KB
    data = (size / 1024).toFixed(2) + "KB";
  } else if (size < 1 * 1024 * 1024 * 1024) {
    //如果小于0.1GB转化成MB
    data = (size / (1024 * 1024)).toFixed(2) + "MB";
  } else {
    //其他转化成GB
    data = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  }
  let sizestr = data + "";
  // let len = sizestr.indexOf("\.");
  // let dec = sizestr.substring(len + 1, len + 3);
  // if (dec == "00") {//当小数点后为00时 去掉小数部分
  //     return sizestr.substring(0, len) + sizestr.substring(len + 3, len + 5);
  // }
  return sizestr;
}

module.exports = { getClientIP, convertorFileSize };
