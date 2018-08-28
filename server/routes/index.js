const express = require('express')

const controllerIndex = require('../controller/index')
const controllerLogin = require('../controller/login')
const controllerAdmin = require('../controller/admin')

const router = express.Router()

router.get('/', controllerIndex.getIndex)
router.post('/', controllerIndex.postFormData)
router.get('/login', controllerLogin.getLogin)
router.post('/login', controllerLogin.auth)
router.get('/admin', controllerAdmin.getAdmin)
router.post('/admin/skills', controllerAdmin.updateSkills)
router.post('/admin/upload', controllerAdmin.upload)

module.exports = router
