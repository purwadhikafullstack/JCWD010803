const express = require('express')
const { roomController } = require('../controllers/room')
const { checkRoom } = require('../midlewares/tenant/validatorRoom')
const { multerUpload } = require('../midlewares/multer')

const router = express.Router()

router.post('/unAvailablity', roomController.addUnavailableDate)
router.get('/roomImg/:roomId', roomController.getRoomImage)
router.post('/roomById/:id', roomController.roomById)
router.get('/roomByProperty/:propertyId', roomController.getRoomByProperties)
router.patch('/:id', roomController.updateRoom)
router.patch('/editImage/:id',multerUpload(`./public/room`, 'roomImg').single('roomImg') ,roomController.editImage)
router.patch('/delete/:id', roomController.deleteRoom)
router.post('/:id',multerUpload(`./public/room`, 'roomImg').array('roomImg'),checkRoom,roomController.addRoom)

module.exports = router