class statusCode {
  constructor(code, msg) {
    this.code = code;
    this.msg = msg;
  }
  getCode(data, msg = this.msg) {
    return { code: this.code, data, msg };
  }
}
const SUCESS_RES = new statusCode(200, "success");
const ERROR_RES = new statusCode(500, "服务器繁忙，请联系管理员！");
const ERROR_UPLOAD = new statusCode(400, "上传文件不能为空");

const verifyMsg = (msg = "", code = 400) => {
  return {
    code: code,
    data: null,
    msg: msg,
  };
};
module.exports = {
  SUCESS_RES,
  ERROR_RES,
  ERROR_UPLOAD,
  verifyMsg,
};
