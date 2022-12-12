const mysql = require('mysql')

// 连接数据库配置
function _connection(){
  const connection = mysql.createConnection({
    host: "1.15.42.9",
    user: 'verse',
    password: '123456',
    database: 'verse'
  })
  connection.connect()
  return connection
}

exports.query = function(sql, params = null){
  const connection = _connection()
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results, fields) => {
      // 有错误抛出错误
      if(error) throw error
      // 返回结果
      resolve(results)
    })
  })
}