const Router = require('koa-router');
const body = require('koa-body');
const router = new Router()
const controller = require('../controller/index')

router.get('/', controller.getIndex)
router.post('/', body(), controller.postFormData)

module.exports = router
