var ImageC = require('../Controllers/ImageC')

module.exports = function(app){
    app.get('/image/:imagem', (req, res) => {
        ImageC.index(app, req, res)
    })
}