const jwt = require('jsonwebtoken')
const colors = require('colors')
const Employe = require('../Models/Employes')
const ENV = process.env
const Controller = require('../Others/Controller')
class EmployerAPI extends Controller {

    all(app, req, res, next) {
        jwt.verify(req.token, ENV.SECRET_KEY, (err, token) => {
            if(err){
                console.log(req.token)
                res.send(err)
                return ;
            }
            Employe.getAll().then((employer => {
                this.sendSuccessResponse(req, res, next, employer)
            })).catch(err => {
                this.sendErrorResponse(req, res, next, err)
            })
        })
        
    }

    onlyOne(app, req, res, next) {
        var _id = req.params.id
        jwt.verify(req.token, ENV.SECRET_KEY, (err, token) => {
            if(err){
                console.log(req.token)
                res.send(err)
                return ;
            }

            Employe.getById({_id}).then(result => {
                this.sendSuccessResponse(req, res, next, result)
            }).catch(err => {
                this.sendErrorResponse(req, res, next, err)
            })
        })
       
    }

    create(app, req, res, next) {
        var data = req.body
        jwt.verify(req.token, ENV.SECRET_KEY, (err, token) => {
            if(err){
                console.log(req.token)
                res.send(err)
                return ;
            }
            Employe.create(data).then(result => {
                this.sendSuccessResponse(req, res, next, result)
            }).catch(err => {
                this.sendErrorResponse(req, res, next, err)
            })
        })
    }

    remove(app, req, res, next) {
        var id = req.params.id
        jwt.verify(req.token, ENV.SECRET_KEY, (err, token) => {
            if(err){
                console.log(req.token)
                res.send(err)
                return ;
            }
            Employe.delete(id).then(result => {
                this.sendSuccessResponse(req, res, next, result)
            }).catch(err => {
                this.sendErrorResponse(req, res, next, err)
            })
        })
    }

    update(app, req, res, next) {
        let data = req.body
        jwt.verify(req.token, ENV.SECRET_KEY, (err, token) => {
            if(err){
                console.log(req.token)
                res.send(err)
                return ;
            }

            Employe.update(data).then(result => {
                this.sendSuccessResponse(req, res, next, result)
            }).catch(err => {
                this.sendErrorResponse(req, res, next, err)
            })
        })
    }

    script(app, req, res, next) {
        res.send('Script')
    }

    index(app, req, res, next) {
        jwt.verify(req.token, ENV.SECRET_KEY, (err, token) => {
            if (err) {
                res.send(err)
                return;
            }
            this.sendSuccessResponse(req, res, next);

        })
    }

    login(app, req, res, next) {
        var body = req.body
        if (body.usuario == undefined || body.senha == undefined) {
            return res.send('Informe as credenciais');
        }
        Employe.login(body).then(result => {
            this.sendSuccessResponse(req, res, next, result)
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
    }

}

module.exports = new EmployerAPI
