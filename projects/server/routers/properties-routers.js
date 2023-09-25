const { propertiesController } = require('../controllers/property');
const { propertyImg } = require('../midlewares/multer');
const { checkProperty } = require('../midlewares/property/validator-property');
const { verifyToken } = require('../midlewares/token');

const router = require('express').Router()

router.get('/sortProperties', propertiesController.sortProperty)
router.get('/image/:filename', propertiesController.getPropertyimage);
router.get('/allCategories', propertiesController.getAllCategory)
router.post('/',verifyToken, propertyImg("./public/property", "property").single('file'), checkProperty, propertiesController.addProperty)
router.patch('/:id', propertyImg("./public/property", "property").single('file'),checkProperty ,propertiesController.updateProperty)
router.patch('/delete/:id', propertiesController.deleteProperty)
router.get('/myProperties', verifyToken,propertiesController.myProperties)




module.exports = router