const express = require('express');
const { signUpUser } = require('../controller/userController');

const router = express.Router()

router.route("/signUp").post(signUpUser)

module.exports = router;
