var redis = require('redis')
var client = redis.createClient()


module.exports.setComputerRedisCount = function(){
    var num = Math.random() * (100000 / 2) - 1
    num = num.toFixed(0)
    return client.set('count_computer', num, redis.print)
    client.end()
}

module.exports.setPhoneRedisCount = function(){
    var num = Math.random() * (100000 / 2) - 1
    num = num.toFixed(0)
    return client.set('count_phone', num, redis.print)
    client.end()
}
