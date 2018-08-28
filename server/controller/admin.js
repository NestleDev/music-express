const uploadas = require('../libs/upload')
const db = require('../model/db')

module.exports = {
    getAdmin: (req, res) => {
        if (!req.session.auth) {
            return res.redirect('/login')
        }

        const dataFlash = {
            msgskill: req.flash('info')[0],
            msgfile: req.flash('err')[0] || req.flash('data')[0]
        }

        res.render('pages/admin', dataFlash)
    },
    updateSkills: (req, res) => {
        const data = req.body

        if (!data.age && !data.concerts && !data.cities && !data.years) {
            req.flash('info', 'Заполните нужные поля!')

            return res.redirect('/admin')
        }

        Object.keys(data).forEach((item, i) => {
            if (data[item]) {
                db.get(`skills[${i}]`)
                    .set('number', data[item])
                    .write()
            }
        });

        req.flash('info', 'Данные обновлены! :)')
        res.redirect('/admin')
    },
    upload: (req, res) => {
        uploadas(req, res, (err, msg) => {
            if (err) {
                req.flash('err', err.message)

                return res.redirect('/admin')
            }

            req.flash('data', msg)
            res.redirect('/admin')
        });
    }
}