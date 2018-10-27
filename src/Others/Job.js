const IT = require('../Models/IT_Devices')
const Employes = require('../Models/Employes')
const ITController = require('../Controllers/IT_DevicesC')
const moment = require('moment')
const data = require('./data')()
const faker = require('faker')

class Job {
    constructor() {
        this.faker = require('faker')
        this.insertData = (i) => new Promise((resolve, reject) => {
            Employes.create(this.generateFake()).then((data => {
                resolve(data);
            })).catch(err => {
                reject(err);
            })
        });
    }

    now() {
        let date = moment().format('DD/MM/YYYY - HH:MM:ss')
        let mili = this.miliseconds()
        
        return `${date}:${mili}`
    }

    miliseconds() {
        return moment().milliseconds()
    }

    locales(){
        var locales = ['pt_BR', 'en', 'fr', 'es', 'it']
        return locales[this.faker.random.number({min: 0, max: 4})]
    }

    generateFake() {
        let firstName = this.faker.name.firstName()
        let lastName = this.faker.name.lastName()
        let locale = this.locales()
        this.faker.locale = locale
        console.log(`Generating people from ${locale}`)
        return {
            nome: `${firstName} ${lastName}`,
            cpf: this.faker.random.number({min: 10000000000, max: 999999999990}),
            UA: this.faker.random.number({min: 10000000, max: 99999999}),
            UE: this.faker.random.number({min: 1000, max: 9999}),
            telefone: this.faker.phone.phoneNumber('(##) 9#### ####'),
            email:  this.faker.internet.email(firstName, lastName),
            cargo: this.faker.commerce.department(),
            setor: this.faker.commerce.department()
        }
    }

    async insert(){
        for (let i = 0; i < 500; i++) {
            const result = await this.insertData(i)
            console.log(`${i}|${result}`)
        }
        process.exit(1)
    }
}

const newJob = new Job()
newJob.insert()