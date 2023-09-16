const express = require('express')
const { roomController } = require('../controllers/room')
const { checkRoom } = require('../midlewares/tenant/validatorRoom')
const { multerUpload } = require('../midlewares/multer')

const router = express.Router()

router.post('/:id',multerUpload(`./public/room`, 'roomImg').array('roomImg'),checkRoom,roomController.addRoom)
router.patch('/delete/:id', roomController.deleteRoom)
router.patch('/:id', roomController.updateRoom)

module.exports = router