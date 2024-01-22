const express = require('express');
const { signUpUser, loginUser, uploadProfilePicture } = require('../controller/userController');
const multer = require('multer');

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.route('/signUp').post(signUpUser);
router.route('/login').post(loginUser);
router.route('/upload-profile-pic').post(upload.single('file'), uploadProfilePicture);

module.exports = router;
