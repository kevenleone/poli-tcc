var verifyToken = function (req, res, next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        var bearer = bearerHeader.split(' ')
        var bearerToken = bearer[1]
        req.token = bearerToken
        next();
    } else {
        res.status(401).json({Error: "Acesso não autorizado"})
    }
}

module.exports = function(){
    return verifyToken
}