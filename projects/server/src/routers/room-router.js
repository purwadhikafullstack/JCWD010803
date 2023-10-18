const express = require('express')
const { roomController } = require('../controllers/room')
const { checkRoom } = require('../midlewares/tenant/validatorRoom')
const { multerUpload } = require('../midlewares/multer')
const path = require('path')

const router = express.Router()

router.post('/unAvailablity', roomController.addUnavailableDate)
router.get('/roomImg/:roomId', roomController.getRoomImage)
router.post('/roomById/:id', roomController.roomById)
router.get('/roomByProperty/:propertyId', roomController.getRoomByProperties)
router.post('/review/:id', roomController.getReview)
router.patch('/:id', roomController.updateRoom)
router.patch('/:id', roomController.updateRoom)
router.patch('/editImage/:id',multerUpload(path.join(__dirname, "../../public/room"), 'roomImg').single("roomImg") ,roomController.editImage)
router.patch('/delete/:id', roomController.deleteRoom)
router.post('/:id',multerUpload(path.join(__dirname, "../../public/room"), 'roomImg').single("roomImg"),checkRoom,roomController.addRoom)

module.exports = router