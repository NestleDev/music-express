const express = require('express')
const controller = require('../controller/index')

const router = express.Router()

router.get('/', controller.getIndex)
router.post('/', controller.postFormData)

module.exports = router
