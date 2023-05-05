const dotenv = require("dotenv");
// 上线时只需要需运行`sh start.sh`
const path = process.env.NODE_ENV
  ? ".env.development"
  : ".env.production.local";
dotenv.config({ path });

module.exports = process.env;
