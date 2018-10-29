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
    endereco: [{
        cidade: String,
        pais: String,
        estado: String,
        rua: String,
        numero: Number,
        cep: String
    }],
    equipamentos: [{
        _id: ObjectId,
        imei: Number,
        servicetag: String,
        mac: String,
        modelo: String,
        chips: String,
        tipo_equipamento: String,
        chip_ativado: Boolean,
        numero_chip: String,
        entrega: Date,
        devolucao: Date,
        anexos: {type: Array, "default": []}
    }],
    created: {type: Date, default: Date.now},

})

var Employe = mongoose.model('employe', EmployeSchema)

module.exports = Employe