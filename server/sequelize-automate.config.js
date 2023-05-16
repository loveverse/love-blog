// module.exports = {
//   /*
//     --version       Show version number                                  [boolean]
//   --help          Show help                                            [boolean]
//   --type, -t      Which code style want to generate.
//                            [choices: "js", "ts", "egg", "midway", "@ali/midway"]
//   --host, -h      IP/Hostname for the database.  [string] [default: "localhost"]
//   --database, -d  Database name.                      [string] [default: "test"]
//   --user, -u      Username for database.              [string] [default: "root"]
//   --password, -p  Password for database.              [string] [default: "root"]
//   --port, -P      Port number for database. e.g. MySQL/MariaDB: 3306, Postgres:
//                   5432, MSSQL: 1433                                     [number]
//   --dialect, -e   The dialect/engine that you're using: mysql, sqlite, postgres,
//                   mssql
//             [choices: "mysql", "sqlite", "postgres", "mssql"] [default: "mysql"]
//   --output, -o    What directory to place the models.
//                                                     [string] [default: "models"]
//   --camel, -C     Use camel case to name models       [boolean] [default: false]
//   --config, -c    Sequelize automate config file, see README.md         [string]
//   --emptyDir, -r  Remove all files in `dir` and `typesDir` directories before
//                   generate models.
//   */
//   dbOptions: {
//     database: "verse",
//     username: "verse",
//     password: "123456",
//     dialect: "mysql",
//     host: "1.15.42.9",
//     port: 3306,
//     logging: false,
//   },
//   options: {
//     type: "js",
//     dir: "./src/models",
//     camelCase: true,
//   },
// };

const Automate = require("sequelize-automate");
const dbOptions = {
  database: "verse",
  username: "verse",
  password: "ECaeGfjdKJhYhXzD",
  dialect: "mysql",
  host: "1.15.42.9",
  port: 3306,
  logging: false,
  define: {
    underscored: false,
    freezeTableName: false,
    charset: "utf8mb4",
    timezone: "+00:00",
    dialectOptions: {
      collate: "utf8_general_ci",
    },
    timestamps: true, // 自动创建createAt和updateAt
  },
};
const options = {
  type: "js",
  dir: "./src/models",
  camelCase: true,
};
const automate = new Automate(dbOptions, options);
(async function main() {
  const code = await automate.run();
  console.log(code);
})();
