const IT  = require('../Models/IT_Devices')
const Employes  = require('../Models/Employes')
const ITController = require('../Controllers/IT_DevicesC')
const moment = require('moment')
const data = require('./data')()

class Job {
    constructor(){
    }

    async insert(data, index){

        Employes.create(data[0]).then((data => {
            console.log(`${this.now()} - Inserted... ${index}`)
        })).catch(err => {
            console.log(err)
        })
       
    }

    now(){
        let date = moment().format('DD/MM/YYYY - HH:MM:ss')  
        let mili = this.miliseconds()

        return `${date}:${mili}`
    }

    miliseconds(){
        return moment().milliseconds()
    }
}

var RunJob = new Job();

console.log(`${RunJob.now()} started...`)
for(let i = 0; i < 1000000; i++){
     RunJob.insert(data, i)
}