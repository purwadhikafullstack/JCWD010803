const express = require('express');
const { checkregister, checkResetPassword, checkForgotPassword, checkNewPassword } = require('../midlewares/user/user-midleware');
const { verifyToken } = require('../midlewares/token');
const { userController } = require('../controllers/user');
const { multerUpload } = require('../midlewares/multer');
const { orderController } = require('../controllers/tenant');
const router = require('express').Router();
const path = require('path')

router.post('/login', userController.login)
router.get('/allStatus', orderController.getAllStatus)
router.post('/checkFirebase', userController.checkFirebase);
router.post('/register', userController.register);
router.post('/keepLogin',verifyToken , userController.keepLogin)
router.patch('/resetPassword',verifyToken, checkResetPassword, userController.resetPassword)
router.post('/sendMail', checkForgotPassword,userController.forgotPassword)
router.post('/checkOtp', userController.checkOtp)
router.patch('/changePassword', verifyToken,checkNewPassword, userController.changePassword)
router.post('/otp', verifyToken, userController.getOtp);
router.post('/verify', verifyToken, userController.verifyAccount);
router.post('/information-update', verifyToken, userController.updateProfile);
router.post('/avatar', verifyToken, multerUpload(path.join(__dirname, '../../public/avatars'), 'ava').single('file'),userController.updateAvatar);
router.post('/orders', verifyToken, userController.getOrderList);
router.post('/upload-payment',multerUpload(path.join(__dirname, "../../public/payment"), 'pc').single("file"), userController.uploadPayment);
router.post('/review', userController.postReview);

module.exports = router;