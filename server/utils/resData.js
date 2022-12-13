class statusCode {
  constructor(code, msg) {
    this.code = code;
    this.msg = msg;
  }
  getCode(data, msg = this.msg) {
    return { code: this.code, data, msg };
  }
  
}
console.log(statusCode);
const SUCESS_RES = new statusCode(200, "success");

module.exports = {
  SUCESS_RES,
};
// module.exports = class resSend {
//   static success = function (data, msg) {
//     return {
//       code: 200,
//       data: data,
//       msg: msg,
//     };
//   };

//   static fail = function (status, error) {
//     return {
//       code: status,
//       msg: error,
//     };
//   };
// };
