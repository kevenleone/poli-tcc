var redis = require('redis')
var client = redis.createClient()
var mongoose = require('mongoose')
var Employe = require('../Schemas/Employes')

module.exports = new class EmployeModel {
    getAll() {
        return Employe.find();
    }

    getById(id) {
        return Employe.findById(id);
    }

    create(employe) {
        client.incrby('count_employer', 1)
        return Employe.create(employe);
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
        }

        return Employe.findByIdAndUpdate(id, updatedEmploye, { new: true });
    }

    delete(id) {
        client.decrby('count_employer', 1)
        return Employe.findByIdAndRemove(id);
    }
}