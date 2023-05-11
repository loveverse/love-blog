const { get } = require("../utils/http/index");

const ipBase = "https://api.vore.top/api/IPdata";
const reqIp = (params) => get(ipBase, { params });

module.exports = {
  reqIp,
};
