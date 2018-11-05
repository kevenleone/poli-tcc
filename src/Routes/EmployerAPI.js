var Employer = require('../Controllers/EmployerAPI')
var verifyToken = require('../../config/tokenjwt')
module.exports = function(app){
    app.get('/', verifyToken(),  (req, res, next) => Employer.index(app, req, res, next))
    app.post('/api/login', (req, res, next) => Employer.login(app, req, res, next))
    app.get('/api/funcionarios', verifyToken(), (req, res, next) => Employer.all(app, req, res, next))
    app.get('/api/funcionarios/:id', verifyToken(), (req, res, next) => Employer.onlyOne(app, req, res, next))
    app.get('/api/script/:total', (req, res, next) => Employer.script(app,req, res))
    app.post('/api/funcionarios', verifyToken(), (req, res, next) => Employer.create(app, req, res, next))
    app.put('/api/funcionarios/:id', verifyToken(), (req, res, next) => Employer.update(app, req, res, next))
    app.delete('/api/funcionarios/:id', verifyToken(), (req, res, next) => Employer.remove(app, req, res, next))
}