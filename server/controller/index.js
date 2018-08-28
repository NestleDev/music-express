const db = require('../model/db')
const config = require('../config')
const sendMail = require('../libs/send.mail')

module.exports = {
    getIndex: (req, res) => {
        const data = {
            msgsemail: req.flash('info')[0],
            products: db.get('products').value(),
            skills: db.get('skills').value()
        }

        res.render('pages/index', data)
    },
    postFormData(req, res) {
        if (req.body.name && req.body.email && req.body.message) {
            sendMail(config, req.body, (error, info) => {
                if (error) {
                    req.flash('info', error.message)
                    return res.redirect('/#status')
                }

                req.flash('info', info)
                res.redirect('/#status')
            })
        } else {
            req.flash('info', 'Заполните все поля')
            res.redirect('/#status')
        }
    }
}