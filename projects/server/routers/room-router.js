const express = require('express')
const { roomController } = require('../controllers/room')
const { checkRoom } = require('../midlewares/tenant/validatorRoom')
const { multerUpload } = require('../midlewares/multer')

const router = express.Router()

router.patch('/delete/:id', roomController.deleteRoom)
router.get('/roomImg/:roomId', roomController.getRoomImage)
router.get('/roomByProperty/:propertyId', roomController.getRoomByProperties)
router.patch('/:id', roomController.updateRoom)
router.get('/:id', roomController.roomById)
router.patch('/editImage/:id',multerUpload(`./public/room`, 'roomImg').single('roomImg') ,roomController.editImage)
router.post('/:id',multerUpload(`./public/room`, 'roomImg').array('roomImg'),checkRoom,roomController.addRoom)

module.exports = router