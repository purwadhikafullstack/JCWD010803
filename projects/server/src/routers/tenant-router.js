const express = require('express')
const { multerUpload } = require('../midlewares/multer')
const { checkRegister } = require('../midlewares/tenant/tenant-validator')
const { AuthController } = require('../controllers/tenant')
const path = require('path')

const router = express.Router()

router.post('/registerTenant',multerUpload("/KTP", 'IDCard').single("file"), checkRegister , AuthController.regisTenant)
router.post('/loginTenant', AuthController.loginTenant)

module.exports = router