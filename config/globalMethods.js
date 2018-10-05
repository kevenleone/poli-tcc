const moment = require('moment')
const crypto = require('crypto')
const algorithm = 'AES-128-CBC'
const key = 'avadakedavra'

module.exports.encrypt = function(val){
    var cipher = crypto.createCipher(algorithm, key);
    var crypted = cipher.update(val, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
}

module.exports.decrypt = function(val){
    try {
        var decipher = crypto.createDecipher(algorithm, key);
        var decrypted = decipher.update(val, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        
        return decrypted;

        } catch(err) {
            return {error : 'INVALID_ENCRYPTED_TEXT'}
        }
}

module.exports.formataData = function(data, pattern = "DD/MM/YYYY"){
    if(data == '0000-00-00' || data == '0000-00-00 00:00:00'){
        return ''
    } else {
        return moment(data).format(pattern);
    }
}

module.exports.formataHora = function(hora){
    if(hora !== '00:00:00'){
        return moment(hora, "h:mm").format("hh:mm")
    } else {
        return ''
    }
}




