var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/sisati', {useNewUrlParser: true})

var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;


var EmployeSchema = new Schema({
    id: ObjectId,
    nome: String,
    cpf: String,
    ua: String,
    ue: String,
    telefone: String,
    email: String,
    cargo: String,
    setor: String,
    created: {type: Date, default: Date.now},

    equipamentos: [{
        _id: ObjectId,
        entrega: Date,
        devolucao: Date,
        anexos: {type: Array, "default": []}
    }]
})

var Employe = mongoose.model('employe', EmployeSchema)

module.exports = Employe