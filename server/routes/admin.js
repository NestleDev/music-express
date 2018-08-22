const express = require('express')
const controller = require('../controller/admin')

const router = express.Router()

router.get('/', controller.getAdmin)
router.post('/skills', controller.updateSkills)
router.post('/upload', controller.upload)

module.exports = router