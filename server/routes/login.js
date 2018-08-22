const express = require('express')
const controller = require('../controller/login')

const router = express.Router()

router.get('/', controller.getLogin)
router.post('/', controller.auth)

module.exports = router