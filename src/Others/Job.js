const IT = require('../Models/IT_Devices')
const ITController = require('../Controllers/IT_DevicesC')
const moment = require('moment')
const faker = require('faker')
const colors = require('colors')
const Helper = require('./Helper')
const {performance} = require('perf_hooks')

class Job extends Helper {
    constructor() {
        super();
        this.faker = require('faker')
        this.acompanhamentos = [ 'Fonte de Alimentação', 'Mochila', 'Teclado', 'Mouse', 'Fone de Ouvido', 'Película', 'Cartão de Memória', 'Nobreak' ]
        this.banco = "MongoDB"
    }

    now() {
        let date = moment().format('DD/MM/YYYY - HH:mm:ss')
        let mili = moment().milliseconds()

        return `${date}:${mili}`.green
    }

    formatDate(date, format = "DD/MM/YYYY - HH:mm"){
        return moment(date).format(format)
    }

    locales() {
        let locales = ['pt_BR', 'es', 'fr', 'en', 'it']
        return locales[this.faker.random.number({min:0, max:2})]
    }

    generateAleatoryDevice(num = this.faker.random.number({min:0, max:3})){
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
            entrega: this.formatDate(this.faker.date.recent()),
            devolucao: undefined,
            anexos: this.generateRandomArr('file', 3),
            em_uso: this.faker.random.boolean(),
            acompanhamentos: undefined,
            responsavel_entrega: `${this.faker.name.firstName()} ${this.faker.name.lastName()}`,
            responsavel_devolucao: undefined
        }
        if(bool == true && num !== 3){
            device.devolucao = this.formatDate(this.faker.date.future())
            device.em_uso = false
            device.responsavel_devolucao = `${this.faker.name.firstName()} ${this.faker.name.lastName()}`
        }
        switch(num){
            case 0: 
                device.imei = this.faker.random.number({min:10000000000, max:90000000000})
                device.modelo = this.getModeloAleatorio('aparelho')
                device.chips = this.faker.random.number({min:0, max:2})
                device.tipo_ativo = 'Celular'
                device.chip_ativado = this.faker.random.boolean()
                device.numero = this.faker.phone.phoneNumber('(##) 9####-####')
                device.acompanhamentos = this.generateArrParams(0, 4, 5, 6) 
                break;
            case 1:
                device.servicetag = this.faker.random.uuid().split('-')[0].toUpperCase()
                device.modelo = this.getModeloAleatorio('computador')
                device.tipo_ativo = "Notebook"
                device.acompanhamentos = this.generateArrParams(0, 1, 2, 3, 7)
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
                device.tipo_ativo = "Software"
                device.expira = bool
                break;
        }
        return device
    }

    generateRandomArr(type, max = this.faker.random.number({min:1, max:5})){
        let arr = []
        if(type == 'address'){
            max = 2
        }
        let it = this.faker.random.number({min:1, max})
        switch(type){
            case 'file':
                for(let i = 0; i < it; i++){
                    arr.push(this.faker.system.commonFileName('jpeg'))
                }
                break;
            case 'device':
                for(let i = 0; i < it; i++){
                    arr.push(this.generateAleatoryDevice())
                }
                break;
            case 'address':
                let atual = true 
                for(let i = 0; i < it; i++){
                    if(i > 0){
                        atual = false
                    }
                    let add = {
                        cidade: this.faker.address.city(),
                        pais: this.faker.address.country(),
                        bairro: this.faker.address.streetAddress(),
                        estado: this.faker.address.state(),
                        rua: this.faker.address.streetName(),
                        numero: this.faker.random.number({min:1,max:10000}),
                        cep: this.faker.address.zipCode('#####-###'),
                        atual: atual
                    }
                    arr.push(add)
                }
                break;
            }
        return arr
    }
  
    generateFakeEmploye() {
        let firstName = this.faker.name.firstName()
        let lastName = this.faker.name.lastName()
        let locale = this.locales()
        this.faker.locale = locale

        let employe = {
            nome: `${firstName} ${lastName}`,
            cpf: this.faker.random.number({min:10000000000, max:999999999990}),
            ua: this.faker.random.number({min:10000000,max:99999999}),
            ue: this.faker.random.number({min:1000,max:9999}),
            telefone: this.faker.phone.phoneNumber('(##) 9####-####'),
            email: this.faker.internet.email(firstName, lastName),
            cargo: this.faker.commerce.department(),
            setor: this.faker.commerce.department(),
            endereco: this.generateRandomArr('address'),
            ativos_tecnologicos: this.generateRandomArr('device')
        }

        if(this.banco !== 'MongoDB'){
            delete employe.ativos_tecnologicos
            delete employe.endereco
        }
        

        return employe

    }

    calculateDate(initial, final) {
        let time = final - initial
        time = (time / 1000).toFixed(2)
        return time
    }

    generateArrParams(...params){
        let random = this.faker.random.number({min:1, max:6})
        let arr = [], arrFinal = []
        if(random > params.length){
            random = params.length
        }
        params.map((values) => {
            arr.push(this.acompanhamentos[values])
        })
        for(let i = 0; i < random; i++){
            arrFinal.push(arr[i])
        }
        return arrFinal
    }

    async insert(y = 50) {
        let timeStart = performance.now();
        console.log(`Starting time: ${this.now()}`)
        console.log(`Running ${y} Inserts on ${this.banco}`.yellow)
        if(this.banco == 'MongoDB'){
            for (let i = 0; i < y; i++) {
                let result = await this.insertData()
            }
        } else {
            for (let i = 0; i < y; i++) {
                let result = await this.insertOnMysql()
            }
        }
        let timeSpent = this.calculateDate(timeStart, performance.now())
        let data = {
            banco: this.banco,
            operacao: 'insert',
            quantidade: y,
            tempo: timeSpent
        }
        let metrics = await this.insertMetrics(data)
        console.log(`End time: ${this.now()}`)
        console.log(`Time Spent: ${timeSpent}`)
        console.log('Closing Programm!'.green)
        process.exit(1)
        return data
    }
}

const newJob = new Job
//newJob.banco = 'MYSQL'
newJob.insert(1000)

//module.exports = Job