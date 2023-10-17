const { propertiesController } = require('../controllers/property');
const { propertyImg } = require('../midlewares/multer');
const { checkProperty } = require('../midlewares/property/validator-property');
const { verifyToken } = require('../midlewares/token');
const path = require('path')
const router = require('express').Router()

router.get('/category', verifyToken, propertiesController.myCategories)
router.get('/myProperties', verifyToken,propertiesController.myProperties)
router.get('/sortProperties', propertiesController.sortProperty)
router.get('/image/:filename', propertiesController.getPropertyimage);
router.get('/allCategories', propertiesController.getAllCategory)
router.post('/',verifyToken, propertyImg(path.join(__dirname, "../../public/property"), 'property').single("file"), checkProperty, propertiesController.addProperty)
router.patch('/:id', propertyImg(path.join(__dirname, "../../public/property"), 'property').single("file"),checkProperty ,propertiesController.updateProperty)
router.patch('/delete/:id', propertiesController.deleteProperty)
router.get('/', propertiesController.allProperties)
router.get('/:id', propertiesController.detailProperty)
router.patch('/editCategory', verifyToken, propertiesController.editCategory);
router.post('/addCategory', verifyToken, propertiesController.addCategory);
router.delete('/deleteCategory', verifyToken, propertiesController.deleteCategory)


module.exports = router