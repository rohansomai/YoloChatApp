const expressAsyncHandler = require('express-async-handler');
const Chat = require('../models/Chat');
const User = require('../models/User');

const accessChat = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body; // receiver's userId

  if (!userId) {
    console.log('UserId param not sent with request');
    return res.sendStatus(400);
  }
  let isChatPresent = await Chat.find({
    isGroupChat: false,
    $and: [{ users: { $elemMatch: { $eq: req.user._id } } }, { users: { $elemMatch: { $eq: userId } } }],
  })
    .populate('users', '-password')
    .populate('latestMessage');

  // isChatPresent = await User.populate(isChatPresent, {
  //   path: 'latestMessage.sender',
  //   select: 'name pic email',
  // });

  if (isChatPresent.length > 0) {
    res.send(isChatPresent[0]);
  } else {
    const newChatBody = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, userId],
      latestMessage: 'HELLO :)',
    };
    try {
      const createdChat = await Chat.create(newChatBody);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate('users', '-password');
      res.status(200).json(FullChat);
    } catch (Error) {
      console.error('Error: ', Error);
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = expressAsyncHandler(async (req, res) => {
  try {
    const allChats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 });
    const userChats = await User.populate(allChats, { path: 'latestMessage.sender', select: 'name pic email' });
    res.status(200).json(userChats);
  } catch (error) {
    console.error(error);
  }
});

module.exports = { accessChat, fetchChats };
