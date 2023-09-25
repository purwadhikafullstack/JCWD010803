const express = require('express')
const { orderController } = require('../controllers/tenant')
const { verifyToken } = require('../midlewares/token')

const router = express.Router()

router.patch('/reject',orderController.rejectTransaction)
router.patch('/confirm',orderController.confirmTransaction)

module.exports = router