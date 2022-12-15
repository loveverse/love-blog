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

module.exports = {
  SUCESS_RES,
  ERROR_RES,
};
