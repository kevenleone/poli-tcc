var Employe = require('../Models/Employes')

module.exports.index = function(app, req, res){
    Employe.getAll().then((employer => {
        console.log(employer)
        res.render('funcionario/index', {employer})
    })).catch(err => {
        res.send(err)
    })
}

module.exports.createPage = function(app, req, res){
    res.render('funcionario/register', {erros:''})
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
    Employe.delete().then(result => {
        res.send(result)
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
