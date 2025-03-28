const { signup, login } = require('../Controller/AuthController');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');

const express = require('express')
const router = express.Router();


router.post("/signup", signupValidation, signup )
router.post("/login", loginValidation, login )

module.exports = router;    