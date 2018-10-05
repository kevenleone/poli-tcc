var IT = require('../Models/IT_Itens')
module.exports = function(app){
    app.get('/', (req, res) => {
        app.src.Controllers.IndexC.dashboard(app, req, res)
    })

    app.get('/random', (req, res) => {
        IT.setComputerRedisCount()
        IT.setPhoneRedisCount()
        res.send('Setted')
    })

}