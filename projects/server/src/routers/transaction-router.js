const express = require('express')
const { multerUpload } = require('../midlewares/multer')
const { transactionController } = require('../controllers/transaction')
const { verifyToken } = require('../midlewares/token')

const router = express.Router()

router.post('/bookingRoom',verifyToken, transactionController.addBooking )

module.exports = router