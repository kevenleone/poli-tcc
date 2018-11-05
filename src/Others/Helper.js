const mysql = require('mysql');
const Employes = require('../Models/Employes')
class Helper {
    constructor() {
        this.faker = require('faker')
        this.modelos = {
            computador: ['X510UR', 'X510UA', 'Lenovo G40-80', 'DELL 4000', 'DELL 3012', 'Latitude 1301', 'Optiplex 7000', 'VOSTRO UltraBook', 'Latitude 9991', 'ASUS XPS', 'Samsung X10'],
            aparelho: ['IPHONE 5S', 'IPHONE SE', 'IPHONE 6SE', 'MOTO G5', 'MOTO G5S', 'REDMI 5 PLUS', 'ONE PLUS', 'SAMSUNG X8', 'SAMSUNG A8', 'SAMSUNG J5', 'SAMSUNG GALAXY', 'IPHONE 7', 'MOTO ONE'],
            voip: ['CISCO 3000', 'CISCO 3400', 'CISCO 5000', 'CISCO 3040', 'CISCO 402', 'CISCO 9211', 'CISCO 1299', 'CISCO 1000'],
            software: ['ADOBE Ilustrator', 'ADOBE PhotoShop', 'Adobe Acrobat Reader', 'Skeetchup', 'RED HAT', 'Microsoft Office', 'Office 365', 'Sony Vegas', 'CAMTASIA Studio', 'Microsoft Windows']
        }

        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "avadakedavra",
            database: "ti-ativos",
            port: 3306
        });

        this.insertMetrics = (data) => new Promise((resolve, reject) => {
            this.query('insert into metricas set ?', data).then(work => {
                resolve(work)
            }).catch(err => {
                reject(err)
            })
        })

        this.insertData = () => new Promise((resolve, reject) => {
            Employes.create(this.generateFakeEmploye()).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        });

        this.insertOnMysql = () => new Promise((resolve, reject) => {
            let employ = this.generateFakeEmploye()
            this.query('insert into funcionarios set ?', employ).then((data => {
                // console.log('Cadastrou funcionário'.green)
                return data
            })).then((result_funcionario) => {
                let funcionario_id = result_funcionario.insertId
                let randomIt = this.faker.random.number({
                    min: 0,
                    max: 1
                })
                for (let i = 0; i < randomIt; i++) {
                    let data = {
                        entrega: this.formatDate(this.faker.date.past(), 'YYYY-MM-DD[T]HH:mm:ss'),
                        devolucao: this.formatDate(this.faker.date.future(), 'YYYY-MM-DD[T]HH:mm:ss'),
                        responsavel_entrega: `${this.faker.name.firstName()} ${this.faker.name.lastName()}`,
                        responsavel_devolucao: undefined,
                        equipamento: undefined,
                        funcionario_id: funcionario_id,
                        equipamento_valor: undefined
                    }
                    switch (this.faker.random.number({
                        min: 0,
                        max: 3
                    })) {
                        case 0:
                            {
                                let aparelho = this.generateAleatoryDevice(0)
                                this.query(`insert into aparelho (imei, modelo, chip, chip_ativado, numero, funcionarios_id) values ('${aparelho.imei}','${aparelho.modelo}','${aparelho.chip}','${aparelho.chip_ativado}','${aparelho.numero}', ${funcionario_id})`)
                                .then((result_aparelho => {
                                    // console.log('Cadastrou aparelho'.green)
                                    return result_aparelho
                                }))
                                .then((aparelho) => {
                                    let aparelho_id = aparelho.insertId
                                    data.equipamento = 'aparelho_id'
                                    data.equipamento_valor = aparelho_id
                                    this.queryAtivos(data).then((result_ativo_aparelho => {
                                            // console.log('Cadastrou ativo de Aparelho'.green)
                                        }))
                                        .catch(err => {
                                            console.log('N cadastrou ativo de aparelho'.red, err)
                                        })
                                }).catch(err => {
                                    console.log('N cadastrou aparelho'.red)
                                })
                                break;
                            }
                        case 1:
                            {
                                let computador = this.generateAleatoryDevice(1)
                                this.query(`insert into computador (servicetag, modelo, tipo_ativo, funcionarios_id)
                                values ('${computador.servicetag}','${computador.modelo}','${computador.tipo_ativo}', ${funcionario_id})`).then(result_computador => {
                                    // console.log('Cadastrou Computador'.green)
                                    return result_computador
                                }).then(computador => {
                                    let computador_id = computador.insertId
                                    data.equipamento = 'computador_id'
                                    data.equipamento_valor = computador_id
                                    this.queryAtivos(data).then(result_ativo_computador => {
                                        // console.log('Cadastrou ativo de computador'.green)
                                    }).catch(err => {
                                        console.log('N cadastrou ativo de computador'.red, err)
                                    })
                                })
                                .catch(err => {
                                    console.log('N cadastrou Computador'.red)
                                })
                                break;
                            }
                        case 2:
                            {
                                let voip = this.generateAleatoryDevice(2)
                                this.query(`insert into voip (mac, modelo, tipo_ativo, numero, funcionarios_id)
                                values('${voip.mac}','${voip.modelo}','${voip.tipo_ativo}','${voip.numero}', ${funcionario_id})`).then(result_voip => {
                                    // console.log('Cadastrou Voip'.green)
                                    return result_voip
                                }).then(voip => {
                                    let voip_id = voip.insertId
                                    data.equipamento = 'voip_id'
                                    data.equipamento_valor = voip_id
                                    this.queryAtivos(data).then(result_ativo_voip => {
                                        // console.log('Cadastrou ativo Voip'.green)
                                    }).catch(err => {
                                        console.log('N cadastrou ativo de voip'.red, err)
                                    })
                                }).catch(err => {
                                    console.log('N cadastrou voip'.red)
                                })
                                break;
                            }
                        case 3:
                            {
                                let software = this.generateAleatoryDevice(3)
                                this.query(`insert into software (software, serial_key, expira) values ('${software.software}','${software.serial_key}','${software.expira}')`).then(result_software => {
                                    //console.log('Software cadastrado'.green)
                                    return result_software
                                }).then(software => {
                                    let software_id = software.insertId
                                    data.equipamento = 'software_id'
                                    data.equipamento_valor = software_id
                                    this.queryAtivos(data).then(result_ativo_software => {
                                        // console.log('Cadastrou ativo software'.green)
                                    }).catch(err => {
                                        console.log('N cadastrou ativo software'.red, err)
                                    })
                                }).catch(err => {
                                    console.log('N cadastrou software'.red, err)
                                })
                            }
                    }
                }
                resolve()
            }).catch(err => {
                console.log('N cadastrou funcionário'.red)
                reject(err)
            })
        })
    }

    getModeloAleatorio(equipamento) {
        let modelo = ''
        switch (equipamento) {
            case 'computador':
                let total_c = this.modelos.computador.length
                modelo = this.modelos.computador[this.faker.random.number({
                    min: 0,
                    max: total_c - 1
                })];
                break;
            case 'aparelho':
                let total_a = this.modelos.aparelho.length
                modelo = this.modelos.aparelho[this.faker.random.number({
                    min: 0,
                    max: total_a - 1
                })];
                break;
            case 'voip':
                let total_v = this.modelos.voip.length
                modelo = this.modelos.voip[this.faker.random.number({
                    min: 0,
                    max: total_v - 1
                })];
                break;
            case 'software':
                let total_s = this.modelos.software.length
                modelo = this.modelos.software[this.faker.random.number({
                    min: 0,
                    max: total_s - 1
                })]
        }
        return modelo
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    queryAtivos(data) {
        return new Promise((resolve, reject) => {
            this.connection.query(`insert into ativos_tecnologicos (entrega, devolucao, funcionarios_id, ${data.equipamento}, responsavel_entrega, responsavel_devolucao) values ('${data.entrega}','${data.devolucao}','${data.funcionario_id}', '${data.equipamento_valor}','${data.responsavel_entrega}','${data.responsavel_devolucao}')`, (err, rows) => {
                if (err){
                    reject(err);
                    return ;
                }
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }

    deleteAll() {
        Employes.deleteAll().then(data => {
            console.log('Removeu...')
        }).catch(err => {
            console.log('N removeu')
        })
    }
}

module.exports = Helper;