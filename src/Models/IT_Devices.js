var redis = require('redis')
var client = redis.createClient()
var mongoose = require('mongoose')
var IT_Device = require('../Schemas/IT_Devices')


module.exports = new class ITDeviceModel {
    getAll() {
        return IT_Device.find();
    }

    getById(id) {
        return IT_Device.findById(id);
    }

    create(ITDevice) {
        client.incrby('count_ITDevicer', 1)
        return IT_Device.create(ITDevice);
    }

    update(id, device) {

        const updatedITDevice = {
            cpf: device.cpf,
            imei: device.imei,
            servicetag: device.servicetag, 
            mac: device.mac, 
            tipo_equipamento: device.tipo_equipamento, 
            modelo_equipamento: device.modelo_equipamento, 
            observacao: device.observacao, 
            created_by: device.created_by, 
            status: device.status,
            ativo: device.ativo
        }

        return IT_Device.findByIdAndUpdate(id, updatedITDevice, { new: true });
    }

    delete(id) {
        client.decrby('count_ITDevicer', 1)
        return IT_Device.findOneAndDelete({_id: id})
    }
}