const express = require('express')
const { multerUpload } = require('../midlewares/multer')
const { checkRegister } = require('../midlewares/tenant/tenant-validator')
const { AuthController } = require('../controllers/tenant')

const router = express.Router()

router.post('/registerTenant', multerUpload(`./public/tenant/KTP`, 'IDCard').single('file'), checkRegister , AuthController.regisTenant)
router.post('/loginTenant', AuthController.loginTenant)

module.exports = router