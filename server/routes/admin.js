const Router = require('koa-router');
const body = require('koa-body');
const path = require('path')
const router = new Router()

const controller = require('../controller/admin')
const config = require('../config')



router.get('/admin', controller.getAdmin)
router.post('/admin/skills', body(), controller.updateSkills)
router.post('/admin/upload', body({
    multipart: true,
    formidable: {
        uploadDir: path.join(process.cwd(), config.upload.path)
    }
}), controller.upload)

module.exports = router