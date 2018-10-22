var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var ITDeviceSchema = new Schema({
    id: ObjectId,
    cpf: {type: String, default: null},
    imei: Number,
    servicetag: String,
    mac: String,
    tipo_equipamento: String,
    modelo_equipamento: String,
    observacao: String,
    created: {type: Date, default: Date.now},
    created_by: String,
    status: {type: Number, default: 1},
    ativo: {type: Number, default: 0},
})

var ITDevice = mongoose.model('ITDevice', ITDeviceSchema)

module.exports = ITDevice



