const express = require('express');
const { signUpUser, loginUser } = require('../controller/userController');

const router = express.Router();

router.route('/signUp').post(signUpUser);
router.route('/login').post(loginUser);

module.exports = router;
