require('dotenv').config()
const ENV = process.env
const PORT = ENV.PORT || 3000
const server = require('./config/loader')

server.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})

server.get("/status", (req, res) => {
    res.send("Hello !")
})