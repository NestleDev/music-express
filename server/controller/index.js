const db = require('../model/db')
const config = require('../config')
const sendMail = require('../helpers/send.mail')
module.exports = {
    getIndex: async (ctx, next) => {
        const data = {
            msgsemail: ctx.flash('info')[0],
            products: db.get('products').value(),
            skills: db.get('skills').value()
        }

        ctx.render('pages/index', data)
    },
    postFormData: async (ctx, next) => {
        const body = ctx.request.body;

        if (body.name && body.email && body.message) {
            try {
                const status = await sendMail(config, body)

                console.log(status)
                ctx.flash('info', status.message)
                ctx.redirect('/#status')

            } catch (error) {
                ctx.flash('info', error.message)
                ctx.redirect('/#status')
            }
        } else {
            ctx.flash('info', 'Заполните все поля')
            ctx.redirect('/#status')
        }
    }
}