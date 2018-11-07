var mongoose = require('mongoose')
var Employe = require('../Schemas/Employes')
var Controller = require('../Others/Controller')
var jwt = require('jsonwebtoken')
var moment = require('moment')
class EmployeModel extends Controller {
    constructor(){
        super()
    }
    getAll() {
        return Employe.find();
    }

    getById(id) {
        return Employe.findById(id);
    }

    create(employe) {
        return Employe.create(employe).then(work =>  this.incrBy('count_employer')).catch(err => console.log(err));
    }

    update(id, employe) {
        const updatedEmploye = {
            nome: employe.nome,
            cpf: employe.cpf,
            UA: employe.ua,
            UE: employe.ue,
            telefone: employe.telefone,
            email: employe.email,
            cargo: employe.cargo,
            setor: employe.setor,
            created: employe.created,

            equipamentos: [{
                entrega: employe.entrega,
                devolucao: employe.devolucao,
                anexos: employe.anexos
            }]
        }

        return Employe.findByIdAndUpdate(id, updatedEmploye, { new: true });
    }

    delete(id) {
        return Employe.findOneAndDelete({_id: id}).then(work => this.decrBy('count_employer'))
    }

    deleteAll(){
        return Employe.deleteMany().then(this.setFromRedis('count_employer', 0))
    }

    async login(body){
        let Helper = require('../Others/Helper')
        let helper = new Helper()
        return new Promise((resolve, reject) => {
            helper.query(`select count(*) total from usuario where usuario = '${body.usuario}' and senha = '${body.senha}'`).then(result => {
                let total = result[0].total
                if(total > 0){
                    jwt.sign(body, 'wingardiumleviosa', (err, token) => {
                        if (err) {
                            reject(err)
                        }
                        this.setFromRedis(`lastlogin_${body.usuario}`, moment().format())
                        this.setHashToRedis('log_login', 'usuario', body.usuario)
                        resolve(token)
                    })
                }
                else {
                    console.log(`204 | ${body.usuario} Usuário ou senha não encontrado`.green)
                    reject('Usuário não encontrado')
                }
            }).catch(err => {
                reject(err)
            })
        })
    }
}

module.exports = new EmployeModel