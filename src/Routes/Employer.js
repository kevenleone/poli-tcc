var Employer = require('../Controllers/EmployerC')

module.exports = function(app){
    app.get('/funcionarios', (req, res) => {
       Employer.index(app, req, res)
    })

    app.post('/funcionario/cadastrar', (req, res) => {
        Employer.create(app, req, res)
    })

    app.get('/funcionario/cadastrar', (req, res) => {
        Employer.createPage(app, req, res)
    })

}