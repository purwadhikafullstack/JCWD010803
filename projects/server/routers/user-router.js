const express = require('express');
const userController = require('../controllers/user/user-controllers');
const { checkregister } = require('../midlewares/user/user-midleware');

const router = express.Router();

router.post('/register', checkregister,userController.register);
router.post('/login', userController.login)
router.post('/keepLogin',verifyToken , userController.keepLogin)

module.exports = router;