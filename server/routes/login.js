const Router = require('koa-router');
const body = require('koa-body');
const router = new Router()

const controller = require('../controller/login')

router.get('/login', controller.getLogin)
router.post('/login', body(), controller.auth)

module.exports = router