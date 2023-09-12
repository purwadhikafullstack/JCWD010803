const { propertiesController } = require('../controllers/property')

const router = require('express').Router()

router.get('/sortProperties', propertiesController.sortProperty)
router.get('/image/:filename', propertiesController.getPropertyimage);

module.exports = router