const axios = require("axios");
const mysql = require("mysql");

// 连接数据库配置
// function _connection(){
//   const connection = mysql.createConnection({
//     host: "1.12.252.87",
//     user: 'verse',
//     password: '123456',
//     database: 'verse'
//   })
//   connection.connect()
//   return connection
// }

const connection = mysql.createConnection({
  host: "1.15.42.9",
  user: "verse",
  password: "123456",
  database: "verse",
});
connection.connect();
const findSql = "select content from hot";
const addSql =
  "insert into hot(name, url, picurl, artistsname, avatarurl, nickname, content, identification) values(?,?,?,?,?,?,?,?)";
//
const baseUrlArray = [
  "https://api.uomg.com/api/comments.163",
  "https://api.julym.com/163/rand.php?id=2223747711",
];

connection.query(findSql, function (err, result) {
  if (err) {
    console.log("报错：", err);
  } else {
    // console.log(JSON.stringify(result));
    let contentArray = result.map((item) => item.content);
    console.log("查询数据成功！");
    successCallback(contentArray);
  }
  connection.end();
});

function successCallback(data) {
  baseUrlArray.forEach((item, index) => {
    axios({
      methods: "post",
      url: item,
      timeout: 20000,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    })
      .then((res) => {
        // 连接数据库配置
        const connection = mysql.createConnection({
          host: "1.15.42.9",
          user: "verse",
          password: "123456",
          database: "verse",
        });
        connection.connect();
        switch (index) {
          case 0:
            if (res.status === 200) {
              const {
                name,
                url,
                picurl,
                artistsname,
                avatarurl,
                nickname,
                content,
              } = res.data.data;
              const addSqlParams = [
                name,
                url,
                picurl,
                artistsname,
                avatarurl,
                nickname,
                content,
                index,
              ];
              // 如果数组中有一个和当前需要添加进去的相等，直接返回
              if (data.some((item) => item.content === content))
                return console.log("存在相同的数据");
              connection.query(addSql, addSqlParams, function (err, result) {
                if (err) {
                  console.log("报错：", err);
                } else {
                  console.log("插入数据成功！");
                }
              });
            }
            break;
          case 1:
            if (res.data.code === 200) {
              const {
                song_name,
                song_url,
                song_pic,
                song_author,
                avatar,
                user,
              } = res.data.data;
              let content = res.data.content[0].split("</br>")[1];
              const addSqlParams = [
                song_name,
                song_url,
                song_pic,
                song_author,
                avatar,
                user,
                content,
                index,
              ];
              // 如果数组中有一个和当前需要添加进去的相等，直接返回
              if (data.some((item) => item.content === content))
                return console.log("存在相同的数据");
              connection.query(addSql, addSqlParams, function (err) {
                if (err) {
                  console.log("报错：", err);
                } else {
                  console.log("插入数据成功！");
                }
              });
            }
            break;
          default:
            break;
        }
        connection.end();
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
