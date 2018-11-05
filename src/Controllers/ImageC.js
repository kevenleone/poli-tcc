var fs = require('fs')

module.exports.index = function(app, req, res){
    var img = req.params.imagem
    var path = './src/img'
    var file = `${path}/${img}`
    fs.readFile(file, (err, content) => {
        if(err){
            res.send({err: 'Image not found, bro !', errr: err});
            return ;
        }
        res.writeHead(200, { 'content-type' : 'image/jpg'});
        res.end(content);
    })
}