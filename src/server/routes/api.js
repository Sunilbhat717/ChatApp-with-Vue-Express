const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/Auth/AuthController')

//login route
router.post('/login', AuthController.login)
//register route
router.post('/signup', AuthController.register)

module.exports = router