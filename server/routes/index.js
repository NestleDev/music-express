const Router = require('koa-router')
const body = require('koa-body')
const path = require('path')
const router = new Router()

const controllerIndex = require('../controller/index')
const controllerLogin = require('../controller/login')
const controllerAdmin = require('../controller/admin')
const config = require('../config')

router.get('/', controllerIndex.getIndex)
router.post('/', body(), controllerIndex.postFormData)
router.get('/login', controllerLogin.getLogin)
router.post('/login', body(), controllerLogin.auth)
router.get('/admin', controllerAdmin.getAdmin)
router.post('/admin/skills', body(), controllerAdmin.updateSkills)
router.post('/admin/upload', body({
    multipart: true,
    formidable: {
        uploadDir: path.join(process.cwd(), config.upload.path)
    }
}), controllerAdmin.upload)


module.exports = router
