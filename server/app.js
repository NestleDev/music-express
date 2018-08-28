const Koa = require('koa')
const stat = require('koa-static')
const Pug = require('koa-pug')
const path = require('path')
const session = require('koa-session')
const flash = require('koa-better-flash')
const fs = require('fs')
const config = require('./config')
const error = require('./libs/error')

const routeIndex = require('./routes/index')


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

app.listen(config.port, () => {
    console.log(`server listen on port ${config.port}`)

    if (!fs.existsSync(config.upload.path)) {
        fs.mkdirSync(config.upload.path)
    }

})