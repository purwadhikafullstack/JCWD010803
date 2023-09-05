const express = require('express');
const userController = require('../controllers/user/user-controller');
const { checkregister } = require('../midlewares/user/user-midleware');

const router = express.Router();

router.post('/register', checkregister,userController.register);

module.exports = router;