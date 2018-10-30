class Helper  {
    constructor(){

        this.faker = require('faker')

        this.modelos = {
            computador: ['X510UR', 'X510UA', 'Lenovo G40-80','DELL 4000', 'DELL 3012', 'Latitude 1301', 'Optiplex 7000', 'VOSTRO UltraBook', 'Latitude 9991', 'ASUS XPS', 'Samsung X10'],
            aparelho: ['IPHONE 5S', 'IPHONE SE', 'IPHONE 6SE', 'MOTO G5', 'MOTO G5S', 'REDMI 5 PLUS', 'ONE PLUS', 'SAMSUNG X8', 'SAMSUNG A8', 'SAMSUNG J5', 'SAMSUNG GALAXY', 'IPHONE 7', 'MOTO ONE'],
            voip: ['CISCO 3000', 'CISCO 3400', 'CISCO 5000', 'CISCO 3040', 'CISCO 402', 'CISCO 9211', 'CISCO 1299', 'CISCO 1000'],
            software: ['ADOBE Ilustrator', 'ADOBE PhotoShop', 'Adobe Acrobat Reader', 'Skeetchup', 'RED HAT', 'Microsoft Office', 'Office 365', 'Sony Vegas', 'CAMTASIA Studio', 'Microsoft Windows']
        }
    }

    getAleatoryNumber(maxLenght){
        return this.faker.random.number({min:0, max: maxLenght-1})
    }

    getModeloAleatorio(equipamento){
        var modelo = ''
        switch(equipamento){
            case 'computador':
                let total_c = this.modelos.computador.length
                modelo = this.modelos.computador[this.getAleatoryNumber(total_c)];
                break;
            case 'aparelho':
                let total_a = this.modelos.aparelho.length
                modelo = this.modelos.aparelho[this.getAleatoryNumber(total_a)];
                break;
            case 'voip':
                let total_v = this.modelos.voip.length
                modelo = this.modelos.voip[this.getAleatoryNumber(total_v)];
                break;
            case 'software':
                let total_s = this.modelos.software.length
                modelo = this.modelos.software[this.getAleatoryNumber(total_s)]
        }
        return modelo
    }
}

module.exports = Helper;