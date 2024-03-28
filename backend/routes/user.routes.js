const express = require('express');
const { signUpUser, loginUser, uploadProfilePicture, searchUsers } = require('../controller/user.controller');
const multer = require('multer');
const { protect } = require('../middlewares/auth.middleware');

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.route('/signUp').post(signUpUser);
router.route('/login').post(loginUser);
router.route('/upload-profile-pic').post(upload.single('file'), uploadProfilePicture);
router.route('/search').get(protect, searchUsers);

module.exports = router;
