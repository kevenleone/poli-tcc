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
        bairro: String,
        rua: String,
        numero: Number,
        cep: String,
        atual: Boolean
    }],
    ativos_tecnologicos: [{
        imei: Number,
        servicetag: String,
        mac: String,
        modelo: String,
        chips: Number,
        tipo_ativo: String,
        chip_ativado: Boolean,
        numero: String,
        entrega: Date,
        devolucao: Date,
        em_uso: Boolean,
        serial_number: Number,
        serial_key: String,
        software: String,
        expira: Boolean,
        anexos: []
    }],
    created: {type: Date, default: Date.now},

})

var Employe = mongoose.model('employe', EmployeSchema)

module.exports = Employe