var IT_Devices = require('../Controllers/IT_DevicesC')

module.exports = function(app){

    app.get('/equipamentos', (req, res) => {
        IT_Devices.index(app, req, res)
    })

    app.get('/equipamento/cadastrar', (req, res) => {
        IT_Devices.page_cadastrar(app, req, res)
    })

    app.post('/equipamento/cadastrar', (req, res) => {
        IT_Devices.cadastrar(app, req, res)
    })
}