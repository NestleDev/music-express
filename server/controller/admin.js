const uploadas = require('../helpers/upload')
const db = require('../model/db')

module.exports = {
    getAdmin: async (ctx, next) => {
        if (!ctx.session.auth) {
            return ctx.redirect('/login')
        }

        const dataFlash = {
            msgskill: ctx.flash('info')[0],
            msgfile: ctx.flash('err')[0] || ctx.flash('data')[0]
        }

        ctx.render('pages/admin', dataFlash)
    },
    updateSkills: async (ctx, next) => {
        const data = ctx.request.body

        if (!data.age && !data.concerts && !data.cities && !data.years) {
            ctx.flash('info', 'Заполните нужные поля!')

            return ctx.redirect('/admin')
        }

        Object.keys(data).forEach((item, i) => {
            if (data[item]) {
                db.get(`skills[${i}]`)
                    .set('number', data[item])
                    .write()
            }
        });

        ctx.flash('info', 'Данные обновлены! :)')
        ctx.redirect('/admin')
    },
    upload: async (ctx, next) => {
        const status = uploadas(ctx)

        if (status.error) {
            ctx.flash('err', status.mes)

            return ctx.redirect('/admin')
        }

        ctx.flash('data', status.mes)
        ctx.redirect('/admin')
    }
}