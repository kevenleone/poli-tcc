var express = require('express')
var bodyParser = require('body-parser')
var ejs = require('ejs')
var consign = require('consign')()
const server = express()

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(express.static("src/Web/public"))

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-type");
    res.setHeader("Access-Control-Allow-Credentials", false);
    next();
});

server.set('view engine', 'ejs');
server.set('views', './src/Views');
server.use(express.static('./src/Views/public'));

consign.include("src/Models")
    .then("src/Controllers")
    .then("src/Routes")
    .then("config/mysql_connect.js")
    .into(server)

module.exports = server