require('dotenv').config()
const mysql = require('mysql')
const env = process.env
const connMysql = function (){
    var conn = mysql.createConnection({
        host: env.MYSQL_HOST,
        user: env.MYSQL_USER,
        password: env.MYSQL_PASSWORD,
        database: env.DATABASE,
        port: env.MYSQL_PORT
    })

    return conn
}

module.exports = function(){
    return connMysql()
}