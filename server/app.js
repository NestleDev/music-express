const Koa = require('koa')
const stat = require('koa-static')
const Pug = require('koa-pug')
const path = require('path')
const session = require('koa-session')
const flash = require('koa-better-flash')
const fs = require('fs')
const auth = require('./helpers/auth')
const config = require('./config')
const error = require('./helpers/error')

const routeIndex = require(config.routes.index)
const routeAdmin = require(config.routes.admin)
const routeLogin = require(config.routes.login)

const app = new Koa()
const pug = new Pug({
    viewPath: path.join(__dirname, config.views),
    debug: false,
    pretty: false,
    compileDebug: false,
    noCache: true,
    app: app
})

app.use(stat(config.public))

app.use(error)
app.on('error', (err, ctx) => {
    ctx.render('pages/error', {
        status: ctx.response.status,
        error: ctx.response.message
    })
});

app.keys = ['keys']
app.use(session(config.SESSION_FLASH, app))
app.use(flash())

app.use(routeIndex.routes())
app.use(routeIndex.allowedMethods())
app.use(routeLogin.routes())
app.use(routeLogin.allowedMethods())
app.use(routeAdmin.routes())
app.use(routeAdmin.allowedMethods())
//app.use('/admin', require(config.routes.admin))
//app.use('/login', require(config.routes.login))

app.listen(config.port, () => {
    console.log(`server listen on port ${config.port}`)

    if (!fs.existsSync(config.upload.path)) {
        fs.mkdirSync(config.upload.path)
    }

    if (!process.argv[2] && !process.argv[3]) {
        process.exit(1)
    }

    const login = {
        email: process.argv[2],
        password: process.argv[3]
    }

    auth.setLogin(login)
})

process.on('exit', (status) => {
    if (status === 1) console.log('Задайте логин и пароль в args при запуске сервера!')
})




// const express = require('express')
// const path = require('path')
// const bodyParser = require('body-parser')
// const flash = require('connect-flash')
// const cookieParser = require('cookie-parser')
// const session = require('express-session')
// const fs = require('fs')

// const auth = require('./helpers/auth')
// const config = require('./config')

// const server = express()
// server.set('views', path.join(__dirname, config.views));
// server.set('view engine', 'pug')

// server.use(express.static(path.join(process.cwd(), config.public)))

// server.use(bodyParser.urlencoded({ extended: false }))
// server.use(bodyParser.json())

// server.use(cookieParser())
// server.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: 'login',
//     cookie: {
//         maxAge: 60000
//     }
// }))
// server.use(session({
//     secret: 'mail',
//     saveUninitialized: true,
//     resave: true
// }))

// server.use(flash())
// server.use('/', require(config.routes.index))
// server.use('/admin', require(config.routes.admin))
// server.use('/login', require(config.routes.login))

// server.use((req, res, next) => {
//     res.status(404);
//     res.render('pages/error', { status: res.statusCode, error: 'not Found' });
// });

// server.use((err, req, res, next) => {
//     res.status(500)
//     res.render('pages/error', { status: res.statusCode, error: err.message });
// })

// server.listen(config.port, () => {
//     console.log(`server listen on port ${config.port}`)

//     if (!fs.existsSync(config.upload.path)) {
//         fs.mkdirSync(config.upload.path)
//     }

//     if (!process.argv[2] && !process.argv[3]) {
//         process.exit(1)
//     }

//     const login = {
//         email: process.argv[2],
//         password: process.argv[3]
//     }

//     auth.setLogin(login)
// });

// process.on('exit', (status) => {
//     if (status === 1) console.log('Задайте логин и пароль в args при запуске сервера!')
// })