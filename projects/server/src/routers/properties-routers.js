const { propertiesController } = require('../controllers/property');
const { propertyImg } = require('../midlewares/multer');
const { checkProperty } = require('../midlewares/property/validator-property');
const { verifyToken } = require('../midlewares/token');
const path = require('path')
const router = require('express').Router()

router.get('/', propertiesController.allProperties)
router.post('/',verifyToken, propertyImg(path.join(__dirname, "../../public/property"), 'property').single("file"), checkProperty, propertiesController.addProperty)
router.get('/category', verifyToken, propertiesController.myCategories)
router.get('/myProperties', verifyToken,propertiesController.myProperties)
router.get('/sortProperties', propertiesController.sortProperty)
router.get('/image/:filename', propertiesController.getPropertyimage);
router.patch('/editCategory', verifyToken, propertiesController.editCategory);
router.post('/addCategory', verifyToken, propertiesController.addCategory);
router.delete('/deleteCategory', verifyToken, propertiesController.deleteCategory)
router.get('/allCategories', propertiesController.getAllCategory)
router.patch('/delete/:id', propertiesController.deleteProperty)
router.patch('/:id', propertyImg(path.join(__dirname, "../../public/property"), 'property').single("file"),checkProperty ,propertiesController.updateProperty)
router.get('/:id', propertiesController.detailProperty)


module.exports = router