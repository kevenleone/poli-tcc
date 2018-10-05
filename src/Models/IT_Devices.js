var redis = require('redis')
var client = redis.createClient()
var mongoose = require('mongoose')
var ITDevice = require('../Schemas/IT_Devices')

module.exports = new class ITDeviceModel {
    getAll() {
        return ITDevice.find();
    }

    getById(id) {
        return ITDevice.findById(id);
    }

    create(ITDevice) {
        client.incrby('count_ITDevicer', 1)
        return ITDevice.create(ITDevice);
    }

    update(id, device) {

        const updatedITDevice = {
            employer_id: device.employer_id,
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

        return ITDevice.findByIdAndUpdate(id, updatedITDevice, { new: true });
    }

    delete(id) {
        client.decrby('count_ITDevicer', 1)
        return ITDevice.findOneAndDelete({_id: id})
    }
}