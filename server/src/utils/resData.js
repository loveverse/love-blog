// class statusCode {
//   constructor(code, msg) {
//     this.code = code;
//     this.msg = msg;
//   }
//   getCode(data, msg = this.msg) {
//     return { code: this.code, data, msg };
//   }
// }
const err = {
  userNotNull: "用户名或密码不能为空",
  userAlreadyExist: "用户名已经存在",
  uploadFileNotNull: "上传文件不能为空",
  tokenExpired: "token已过期，请重新登录",
  tokenInvaild: "token无效，请重新登录",
  powerLacking: "抱歉，权限不足",
  unknownError: "未知错误，请联系管理员",
  upload: "上传失败",
};
const success = {
  userLogin: "登录成功",
  userRegister: "注册成功",
  upload: "上传成功",
  common: "成功",
  delete: "删除成功",
  edit: "编辑成功"
};
const ERROR = (str, data = null) => {
  return {
    code: 400,
    data,
    msg: err[str],
  };
};
const SUCCESS = (str, data = null) => {
  return {
    code: 200,
    data,
    msg: success[str],
  };
};
const SERVER_ERROR = () => {
  return {
    code: 500,
    data: null,
    msg: "服务器繁忙，请联系管理员！",
  };
};
// const SUCESS_RES = new statusCode(200, "success");
// const ERROR_RES = new statusCode(500, "服务器繁忙，请联系管理员！");
// const ERROR_UPLOAD = new statusCode(400, "上传文件不能为空");

// const verifyMsg = (msg = "", code = 400) => {
//   return {
//     code: code,
//     data: null,
//     msg: msg,
//   };
// };
module.exports = {
  // SUCESS_RES,
  // ERROR_RES,
  // ERROR_UPLOAD,
  // verifyMsg,
  ERROR,
  SUCCESS,
  SERVER_ERROR,
};
