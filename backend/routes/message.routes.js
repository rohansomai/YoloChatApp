const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const { sendMessage, getAllMessages } = require('../controller/message.controller');

const router = express.Router();

router.route('/').post(protect, sendMessage);
router.route('/:chatId').get(protect, getAllMessages);

module.exports = router;
