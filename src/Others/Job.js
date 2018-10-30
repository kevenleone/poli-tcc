const IT = require('../Models/IT_Devices')
const Employes = require('../Models/Employes')
const ITController = require('../Controllers/IT_DevicesC')
const moment = require('moment')
const faker = require('faker')
const colors = require('colors')
const Helper = require('./Helper')
const {
    performance
} = require('perf_hooks')

class Job extends Helper {
    constructor() {
        super();
        this.faker = require('faker')

        this.insertData = () => new Promise((resolve, reject) => {
            Employes.create(this.generateFake()).then((data => {
                resolve(data);
            })).catch(err => {
                reject(err);
            })
        });
    }

    now() {
        let date = moment().format('DD/MM/YYYY - HH:mm:ss')
        let mili = moment().milliseconds()

        return `${date}:${mili}`.blue
    }

    locales() {
        let locales = ['pt_BR', 'en', 'fr', 'es', 'it']
        return locales[this.faker.random.number({
            min: 0,
            max: 4
        })]
    }

    generateAleatoryDevice(){
        let bool = this.faker.random.boolean()
        let device = {
            imei: undefined,
            servicetag: undefined,
            mac: undefined,
            modelo: undefined,
            chips: undefined,
            tipo_ativo: undefined,
            chip_ativado: undefined,
            numero: undefined,
            serial_number: undefined,
            serial_key: undefined,
            software: undefined,
            expira: undefined,
            entrega: this.faker.date.recent(),
            devolucao: undefined,
            anexos: this.generateFileRandom('file', 3),
            em_uso: this.faker.random.boogitlean()
        }

        if(bool == true){
            device.devolucao = this.faker.date.future()
            device.em_uso = false
        }

        let num = this.faker.random.number({min: 0, max: 3})

        switch(num){
            case 0: 
                device.imei = this.faker.random.number({min: 10000000000, max:90000000000})
                device.modelo = this.getModeloAleatorio('aparelho')
                device.chips = this.faker.random.number({min:0, max: 2})
                device.tipo_ativo = 'Celular'
                device.chip_ativado = this.faker.random.boolean()
                device.numero_chip = this.faker.phone.phoneNumber('(##) 9####-####')
                break;
            case 1:
                device.servicetag = this.faker.random.uuid().split('-')[0].toUpperCase()
                device.modelo = this.getModeloAleatorio('computador')
                device.tipo_ativo = "Notebook"
                break;
            case 2:
                device.mac = this.faker.internet.mac().toUpperCase()
                device.modelo = this.getModeloAleatorio('voip')
                device.tipo_ativo = 'VOIP'
                device.numero = this.faker.phone.phoneNumber('(##) ####-####')
                break;
            case 3:
                device.software = this.getModeloAleatorio('software').toUpperCase();
                device.serial_key = this.faker.random.uuid().toUpperCase()
                device.expira = bool
                break;
        }
       
        return device
    }

    generateFileRandom(type, max = 2){
        let arr = []
        for(let i = 0; i < this.faker.random.number({min: 1, max: max}); i++){
            arr.push(this.faker.system.commonFileName('jpeg'))
        }
        return arr
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
            telefone: this.faker.phone.phoneNumber('(##) 9####-####'),
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
            ativos_tecnologicos: [this.generateAleatoryDevice(), this.generateAleatoryDevice(), this.generateAleatoryDevice()]
        }
    }

    calculateDate(initial, final) {
        let time = final - initial
        return `${(time / 1000).toFixed(2)} seconds`
    }

    async insert(y = 100) {
        let timeStart = performance.now();
        console.log(`Starting time: ${this.now()}`)
        for (let i = 0; i < y; i++) {
            let result = await this.insertData()
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
