var ITDevices = require('../Models/IT_Devices')
var Employe = require('../Models/Employes')

module.exports.index = function(app, req, res){
    ITDevices.getAll().then(data => {
        data.forEach(equipamento => {
            if(equipamento.cpf == null){
                equipamento.cpf = "Dispositivo em Estoque"
            } 
        });
        res.render('equipamento/index', {equipamento: data})
    }).catch(err => {
        res.send(err)
    })
}

module.exports.page_cadastrar = function(app, req, res){
    res.render('equipamento/cadastro', {erros: ''})
}

module.exports.cadastrar = function(app, req, res){
    ITDevices.create(req.body).then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err)
    })
}