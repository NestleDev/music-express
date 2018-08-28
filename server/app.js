const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const fs = require('fs')
const config = require('./config')

const server = express()
server.set('views', path.join(__dirname, config.views));
server.set('view engine', 'pug')

server.use(express.static(path.join(process.cwd(), config.public)))

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use(cookieParser())
server.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'login',
    cookie: {
        maxAge: 60000
    }
}))
server.use(session({
    secret: 'mail',
    saveUninitialized: true,
    resave: true
}))

server.use(flash())
server.use('/', require('./routes/index'))

server.use((req, res, next) => {
    let err = new Error('Not Found')

    err.status = 404
    next(err)
});

server.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('pages/error', { status: res.statusCode, error: err.message })
})

server.listen(config.port, () => {
    console.log(`server listen on port ${config.port}`)

    if (!fs.existsSync(config.upload.path)) {
        fs.mkdirSync(config.upload.path)
    }
});
