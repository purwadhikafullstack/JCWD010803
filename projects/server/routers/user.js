const express = require('express');
const userController = require('../controllers/user');
const { checkregister } = require('../midlewares/userValidator');

const router = express.Router();

router.post('/register',checkregister,userController.register);

module.exports = router;