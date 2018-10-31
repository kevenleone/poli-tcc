var redis = require('redis')
var client = redis.createClient()
var mongoose = require('mongoose')
var Employe = require('../Schemas/Employes')

module.exports = new class EmployeModel {
    getAll() {
        return Employe.find().limit(500);
    }

    getById(id) {
        return Employe.findById(id);
    }

    create(employe) {
        return Employe.create(employe).then(work => client.incrby('count_employer', 1)).catch(err => console.log(err));
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
        client.decrby('count_employer', 1)
        return Employe.findOneAndDelete({_id: id})
    }
}