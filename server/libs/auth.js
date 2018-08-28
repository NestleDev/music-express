const crypto = require('crypto');
const db = require('../model/db');

module.exports = {
    authorization: (login) => {
        const user = db.get('user').value()
        const hash = crypto.pbkdf2Sync(login.password, user.salt, 1000, 512, 'sha512')
            .toString('hex')

        if (hash) {
            return {
                login: user.email,
                password: hash === user.hash
            }
        }
    },
    setLogin: (login) => {
        const salt = crypto.randomBytes(16).toString('hex')
        crypto.pbkdf2(login.password, salt, 1000, 512, 'sha512', (err, hash) => {
            db.set('user', {
                email: login.email,
                salt,
                hash: hash.toString('hex')
            }).write()
        })
    }
}