const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require('../controller/chat.controller');

const router = express.Router();

router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/group/rename').put(protect, renameGroup);
router.route('/group/add-user').put(protect, addToGroup);
router.route('/group/remove-user').put(protect, removeFromGroup);

module.exports = router;
