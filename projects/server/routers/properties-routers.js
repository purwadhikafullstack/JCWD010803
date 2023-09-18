const { propertiesController } = require('../controllers/property')

const router = require('express').Router()

router.get('/sortProperties', propertiesController.sortProperty)
router.get('/image/:filename', propertiesController.getPropertyimage);
router.get('/allCategories', propertiesController.getAllCategory)




module.exports = router