const { propertiesController } = require('../controllers/property');
const { verifyToken } = require('../midlewares/token');

const router = require('express').Router()

router.get('/sortProperties', propertiesController.sortProperty)
router.get('/image/:filename', propertiesController.getPropertyimage);
router.get('/allCategories', propertiesController.getAllCategory)
router.get('/myProperties', verifyToken,propertiesController.myProperties)




module.exports = router