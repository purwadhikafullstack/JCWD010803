const express = require('express')
const specialPriceController = require('../controllers/special-price/special-price-controller')
const router = express.Router()

router.post('/', specialPriceController.addSpecialPrice)

module.exports = router