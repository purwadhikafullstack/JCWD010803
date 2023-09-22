const express = require('express')
const { orderController } = require('../controllers/tenant')
const { verifyToken } = require('../midlewares/token')
const router = express.Router()

router.post('/myOrder',verifyToken, orderController.orderMyProperty)

module.exports = router