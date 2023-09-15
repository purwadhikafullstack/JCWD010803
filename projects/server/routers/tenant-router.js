const express = require('express')
const { multerUpload } = require('../midlewares/multer')
const { AuthController } = require('../controllers/tenant')
const { checkRegister } = require('../midlewares/tenant/tenant-validator')



const router = express.Router()

router.post('/registerTenant', multerUpload(`./public/tenant/KTP`, 'IDCard').single('file'), checkRegister ,AuthController.regisTenant)

module.exports = router