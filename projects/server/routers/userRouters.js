
const userController = require('../controllers/user/user-controllers');
const { verifyToken } = require('../midlewares/token');
const { checkForgotPassword, checkResetPassword, checkNewPassword } = require('../midlewares/userValidator');

const router = require('express').Router();

router.post('/login', userController.login)
router.post('/keepLogin',verifyToken , userController.keepLogin)
router.patch('/changePassword', verifyToken,checkNewPassword, userController.changePassword)

module.exports = router;