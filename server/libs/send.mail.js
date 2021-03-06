const nodemailer = require('nodemailer')

module.exports = (config, data, cb) => {
    const transporter = nodemailer.createTransport(config.mail.smtp);
    const mailOptions = {
        from: `"Fred Foo 👻" <${config.mail.smtp.auth.user}>`, // sender address
        to: data.email, // list of receivers
        subject: 'Hello ✔' + config.subject, // Subject line
        text: `hello world`, // plain text body
        html: `<b>${data.message} ${data.name}</b>` // html body
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return cb(new Error('Cообщение не отправлено :('), null)
        }

        cb(null, "Cообщение отправлено :)")
    })
}