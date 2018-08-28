const auth = require('../libs/auth')

module.exports = {
    getLogin: async (ctx, next) => {
        if (ctx.session.auth) {
            return ctx.redirect('/admin')
        }

        ctx.render('pages/login', { msgslogin: ctx.flash('login')[0] })
    },
    auth: async (ctx, next) => {
        if (ctx.session.auth) {
            return ctx.redirect('/admin')
        }

        const login = {
            email: ctx.request.body.email,
            password: ctx.request.body.password
        }

        const status = auth.authorization(login)

        if (!status) {
            ctx.flash('login', 'Ошибка попробуйте еще')
            return ctx.redirect('/login')
        }

        if (status.password && login.email === status.login) {
            ctx.session.auth = status.password

            ctx.redirect('/admin')
        } else {
            ctx.flash('login', 'Пароль или логин не вырны!')

            return ctx.redirect('/login')
        }
    }
}