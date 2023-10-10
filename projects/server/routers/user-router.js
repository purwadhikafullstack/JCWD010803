const express = require('express');
const { checkregister, checkResetPassword, checkForgotPassword, checkNewPassword } = require('../midlewares/user/user-midleware');
const { verifyToken } = require('../midlewares/token');
const { userController } = require('../controllers/user');
// const { multerUpload } = require('../midlewares/avatar');
const { multerUpload } = require('../midlewares/multer');
const router = require('express').Router();


router.post('/login', userController.login)
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
router.post('/avatar', verifyToken, multerUpload('./public/avatars', 'ava').single('file'),userController.updateAvatar);
router.get('/orders', verifyToken, userController.getOrderList);
router.post('/upload-payment',multerUpload('./public/payment', 'pc').single('file'), userController.uploadPayment);
router.post('/review', userController.postReview);

module.exports = router;