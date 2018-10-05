var Employes = require('../Models/Employes')
var IT = require('../Models/IT_Itens')
var redis = require('redis')
var client = redis.createClient()

module.exports.dashboard = function (app, req, res) {
    client.get('count_employer', (errE, employer) => {
        client.get('count_computer', (errC, computer) => {
            client.get('count_phone', (errP, phone) => {
                var counts = {
                    employer,
                    computer,
                    phone
                }
                res.render('index/index', { counts })
            })
        })
    })
}