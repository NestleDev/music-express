const auth = require('../helpers/auth')

module.exports = {
    getLogin: (req, res) => {
        if (req.session.auth) {
            return res.redirect('/admin')
        }

        res.render('pages/login', { msgslogin: req.flash('login')[0] })
    },
    auth: (req, res) => {
        if (req.session.auth) {
            return res.redirect('/admin')
        }

        const login = {
            email: req.body.email,
            password: req.body.password
        }

        auth.authorization(login, (err, status) => {
            if (err) {
                req.flash('login', err.msg)

                return res.redirect('/login')
            }

            if (status.password && login.email === status.login) {
                req.session.auth = status.password
                res.redirect('/admin')
            } else {
                req.flash('login', 'Пароль или логин не вырны!')

                return res.redirect('/login')
            }
        })
    }
}