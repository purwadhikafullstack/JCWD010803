const express = require('express')
const { roomController } = require('../controllers/room')
const { checkRoom } = require('../midlewares/tenant/validatorRoom')
const { multerUpload } = require('../midlewares/multer')

const router = express.Router()

router.patch('/delete/:id', roomController.deleteRoom)
router.get('/roomByProperty/:propertyId', roomController.getRoomByProperties)
router.patch('/:id', roomController.updateRoom)
router.post('/:id', roomController.roomById)
router.post('/:id',multerUpload(`./public/room`, 'roomImg').array('roomImg'),checkRoom,roomController.addRoom)
router.get('/roomImg/:roomId', roomController.getRoomImage)
router.patch('/editImage/:id',multerUpload(`./public/room`, 'roomImg').single('roomImg') ,roomController.editImage)

module.exports = router