const IT = require('../Models/IT_Devices')
const Employes = require('../Models/Employes')
const ITController = require('../Controllers/IT_DevicesC')
const moment = require('moment')
const faker = require('faker')
const colors = require('colors')
const {
    performance
} = require('perf_hooks')

class Job {
    constructor() {
        this.faker = require('faker')

        this.insertData = () => new Promise((resolve, reject) => {
            Employes.create(this.generateFake()).then((data => {
                resolve(data);
            })).catch(err => {
                reject(err);
            })
        });

        this.device = {
            imei: undefined,
            servicetag: undefined,
            mac: undefined,
            modelo: undefined,
            chips: undefined,
            tipo_equipamento: undefined,
            chip_ativado: undefined,
            numero_chip: undefined,
            entrega: this.faker.date.recent(),
            devolucao: this.faker.date.future(),
        }
    }

    deviceDefault(){
        let device = {
            imei: undefined,
            servicetag: undefined,
            mac: undefined,
            modelo: undefined,
            chips: undefined,
            tipo_equipamento: undefined,
            chip_ativado: undefined,
            numero_chip: undefined,
            entrega: this.faker.date.recent(),
            devolucao: this.faker.date.future(),
        }

        this.device = device
    }

    now() {
        let date = moment().format('DD/MM/YYYY - HH:mm:ss')
        let mili = moment().milliseconds()

        return `${date}:${mili}`.blue
    }

    locales() {
        var locales = ['pt_BR', 'en', 'fr', 'es', 'it']
        return locales[this.faker.random.number({
            min: 0,
            max: 4
        })]
    }

    generateAleatoryDevice(){
        let num = this.faker.random.number({min: 0, max: 1})
        switch(num){
            case 0: 
                this.device.imei = this.faker.random.number({min: 10000000000, max:90000000000})
                this.device.modelo = 'Iphone 5S'
                this.device.chips = this.faker.random.number({min:0, max: 2})
                this.device.tipo_equipamento = 'Celular'
                this.device.chip_ativado = this.faker.random.boolean()
                this.device.numero_chip = this.faker.phone.phoneNumber('(##) 9#### ####')
                break;
            case 1:
                this.device.servicetag = this.faker.random.uuid().split('-')[0].toUpperCase()
                this.device.modelo = "X510U"
                this.device.tipo_equipamento = "Computador"
                break;
        }
        return this.device
    }

    generateFake() {
        let firstName = this.faker.name.firstName()
        let lastName = this.faker.name.lastName()
        let locale = this.locales()
        this.faker.locale = locale

        return {
            nome: `${firstName} ${lastName}`,
            cpf: this.faker.random.number({min: 10000000000, max: 999999999990}),
            UA: this.faker.random.number({min: 10000000,max: 99999999}),
            UE: this.faker.random.number({min: 1000,max: 9999}),
            telefone: this.faker.phone.phoneNumber('(##) 9#### ####'),
            email: this.faker.internet.email(firstName, lastName),
            cargo: this.faker.commerce.department(),
            setor: this.faker.commerce.department(),

            endereco: {
                cidade: this.faker.address.city(),
                pais: this.faker.address.country(),
                estado: this.faker.address.state(),
                rua: this.faker.address.streetName(),
                numero: this.faker.random.number({min: 1,max: 10000}),
                cep: this.faker.address.zipCode('#####-###')
            },

            equipamentos: this.generateAleatoryDevice()
        }
        this.deviceDefault()
    }

    calculateDate(initial, final) {
        let time = final - initial
        return `${(time / 1000).toFixed(2)} seconds`
    }

    async insert(y = 100) {
        var timeStart = performance.now();
        console.log(`Starting time: ${this.now()}`)
        for (let i = 0; i < y; i++) {
            const result = await this.insertData()
        }
        console.log(`End time: ${this.now()}`)
        let timeEnd = performance.now();
        let timeSpent = `${this.calculateDate(timeStart, timeEnd)} & ${y} Inserts`.green
        console.log(`Time Spent: ${timeSpent}`)
        console.log('Closing Programm!'.red)
        process.exit(1)
    }
}

const newJob = new Job()
newJob.insert()
