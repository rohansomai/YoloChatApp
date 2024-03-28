const expressAsyncHandler = require('express-async-handler');
const Chat = require('../models/Chat');
const User = require('../models/User');

const accessChat = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body; // receiver's userId
  if (!userId) {
    return res.status(400).send({ message: 'UserId param not sent with request' });
  }
  let isChatPresent = await Chat.find({
    isGroupChat: false,
    $and: [{ users: { $elemMatch: { $eq: req.user._id } } }, { users: { $elemMatch: { $eq: userId } } }],
  })
    .populate('users', '-password')
    .populate('latestMessage');

  isChatPresent = await User.populate(isChatPresent, {
    path: 'latestMessage.sender',
    select: 'name pic email',
  });

  if (isChatPresent.length > 0) {
    res.send(isChatPresent[0]);
  } else {
    const newChatBody = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, userId],
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
    res.status(500).json({ message: 'Something went wrong while fetching chats' });
    throw new Error('Something went wrong while fetching chats');
  }
});

const createGroupChat = expressAsyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: 'Please provide all the fields' });
  }
  const users = JSON.parse(req.body.users);
  if (users.length < 1) {
    return res.status(400).send({ message: 'More than one users are required to form a group chat' });
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');
    res.status(201).json(fullGroupChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while creating group chat' });
    throw new Error('Something went wrong while creating group chat');
  }
});

const renameGroup = expressAsyncHandler(async (req, res) => {
  if (!req.body.chatName || !req.body.groupChatId) {
    return res.status(400).send({ message: 'Please provide all the fields' });
  }
  try {
    const { groupChatId, chatName } = req.body;
    const updatedChat = await Chat.findOneAndUpdate({ _id: groupChatId }, { chatName }, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');
    if (!updatedChat) {
      res.status(404).json({ message: 'Chat not found' });
    } else {
      res.status(200).json(updatedChat);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while updating group chat' });
    throw new Error('Something went wrong while updating group chat');
  }
});

const addToGroup = expressAsyncHandler(async (req, res) => {
  try {
    const { groupChatId, userId } = req.body;
    if (!groupChatId || !userId) {
      return res.status(400).send({ message: 'Please provide all the fields' });
    }
    const chatDetails = await Chat.findOne({ _id: groupChatId }).select('users');
    if (!chatDetails) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    if (chatDetails.users.includes(userId)) {
      return res.status(400).json({ message: 'This user already exists in this group' });
    }
    const updatedChat = await Chat.findOneAndUpdate({ _id: groupChatId }, { $push: { users: userId } }, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');
    return res.status(200).json(updatedChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while updating group chat' });
    throw new Error('Something went wrong while updating group chat');
  }
});

const removeFromGroup = expressAsyncHandler(async (req, res) => {
  const { groupChatId, userId } = req.body;
  if (!groupChatId || !userId) {
    return res.status(400).json({ message: 'Please provide all the fields' });
  }
  try {
    const updatedChat = await Chat.findOneAndUpdate({ _id: groupChatId }, { $pull: { users: userId } }, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');
    if (!updatedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.status(200).json(updatedChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while updating group chat' });
    throw new Error('Something went wrong while updating group chat');
  }
});

module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup };
