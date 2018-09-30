const mysql = require('mysql')

const connMysql = function (){
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "ti-ativos",
        port: 3306
    })

    return conn
}

module.exports = function(){
    return connMysql()
}