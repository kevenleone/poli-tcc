var jwt = require('jsonwebtoken')

module.exports = class Controller{

    constructor(){
        var redis = require('redis')
        this.client = redis.createClient()
    }

    getFromRedis(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, result) => {
                if (err) {
                    console.log(err)
                    reject(err)
                    return ;
                    
                }
                resolve(result)
            })
        })
    }

    incrBy(key) {
        return new Promise((resolve, reject) => {
            this.client.incrby(key, 1, (err, result) => {
                if (err) {
                    console.log(err)
                    reject(err)
                    return ;
                }
                resolve(result)
            })
        })
    }

    decrBy(key) {
        return new Promise((resolve, reject) => {
            this.client.decrby(key, 1, (err, result) => {
                if (err) {
                    console.log(err)
                    reject(err)
                    return ;
                }
                resolve(result)
            })
        })
    }

   
    setFromRedis(key, value) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, (err, result) => {
                if (err) {
                    console.log(err)
                    reject(err)
                    return ;
                }
                resolve(result)
            })
        })
    }

    setHashToRedis(key, field, value){
        return new Promise((resolve, reject) => {
            this.client.hset(key, field, value, (err, result) => {
                if(err){
                    console.log(err)
                    reject(err)
                    return ;
                }
                resolve(result)
            })
        })
    }

    async sendSuccessResponse(req, res, next, data = {}){
        let token = jwt.decode(req.token)
        let usuario = ''
        let redisPersonalInfo = ''
        if(token){
            usuario = token.usuario
            redisPersonalInfo = {
                lastLogin: await this.getFromRedis(`lastlogin_${usuario}`) 
            }
        }
        res.status(200).send({
            content: undefined,
            status: 200,
            redis: redisPersonalInfo,
            welcome: `Bem vindo ${usuario}`,
            data: data,
        })
        console.log(`${req.method} 200 ${req.url} - User: ${usuario}`.green)
        next()
    }

    sendErrorResponse(req, res, next, error = {}){
        res.status(400).send({
            status: 400, 
            error
        })
        console.log(`${req.method} 400 ${req.url}`.red)
        next()
    }
}