const express = require('express')
const AuthController = require('../controllers/tenant/auth-controller')



const router = express.Router()

router.post('/loginTenant' ,AuthController.loginTenant)

module.exports = router