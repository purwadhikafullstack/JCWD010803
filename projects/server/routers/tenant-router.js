const express = require('express')
const { porpertyTenantController } = require('../controllers/tenant')
const { propertyImg } = require('../midlewares/multer')
const { checkProperty } = require('../midlewares/property/validator-property')
const { verifyToken } = require('../midlewares/token')

const router = express.Router()

router.post('/addProperty',verifyToken, propertyImg("./public/property", "property").single('file'), checkProperty, porpertyTenantController.addProperty)
router.patch('/updateProperty/:id', propertyImg("./public/property", "property").single('file'),checkProperty ,porpertyTenantController.updateProperty)
router.patch('/deleteProperty/:id', porpertyTenantController.deleteProperty)

module.exports = router