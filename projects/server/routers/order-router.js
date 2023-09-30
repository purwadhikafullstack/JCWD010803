const express = require('express')
const { orderController } = require('../controllers/tenant')
const { verifyToken } = require('../midlewares/token')

const router = express.Router()

router.patch('/reject',orderController.rejectTransaction)
router.patch('/cancel',orderController.cancelOrder)
router.patch('/confirm',orderController.confirmTransaction)
router.post('/myOrder',verifyToken, orderController.orderMyProperty)
router.get('/status', orderController.getAllStatus)
router.get('/:id', orderController.orderById)

module.exports = router