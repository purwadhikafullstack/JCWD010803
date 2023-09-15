const express = require('express')
const { roomController } = require('../controllers/room')
const { checkRoom } = require('../midlewares/tenant/validatorRoom')

const router = express.Router()

router.post('/:id',checkRoom,roomController.addRoom)
router.patch('/delete/:id', roomController.deleteRoom)
router.patch('/:id', roomController.updateRoom)

module.exports = router