var Employe = require('../Models/Employes')
const ENV = process.env

module.exports.index = function(app, req, res){
    Employe.getAll().then((employer => {
        if(ENV.ACCESS_TYPE === 'API_ONLY'){
            res.send(employer)
        } else {
            res.render('funcionario/index', {employer})
        }
    })).catch(err => {
        res.send(err)
    })
}

module.exports.createPage = function(app, req, res){
    res.render('funcionario/cadastro', {erros:''})
}

module.exports.showPage = function(app, req, res){
    var id = req.params.id
    Employe.getById(id).then(result => {
        if(ENV.ACCESS_TYPE === 'API_ONLY'){
            res.send(result)
        } else {
            res.render('funcionario/perfil', {funcionario: result, erros: ''})
        }
    }).catch(err => {
        res.send(err)
    })
}

module.exports.create = function(app, req, res){
   var data = req.body

    Employe.create(data).then(result => {
        res.redirect('/funcionarios')
    }).catch(err => {
        res.send({err: err})
    }) 
}

module.exports.delete = function(app, req, res){
    var id = req.params.id

    Employe.delete(id).then(result => {
        console.log(result)
        res.redirect('/funcionarios')
    }).catch(err => {
        res.send(err)
    })
}

module.exports.update = function(app, req, res){
    Employe.update().then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
}
