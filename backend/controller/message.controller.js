const expressAsyncHandler = require('express-async-handler');
const Message = require('../models/Message');
const User = require('../models/User');
const Chat = require('../models/Chat');

const sendMessage = expressAsyncHandler(async (req, res) => {
  if (!req.body.content || !req.body.chatId) {
    return res.status(400).send({ message: 'Please provide all the fields' });
  }
  const { content, chatId } = req.body;
  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    let message = await Message.create(newMessage);
    /*Below line populates the name email pic of the sender(user object) with the help of ID provided*/
    message = await message.populate('sender', 'name email pic');
    /*Below line populates the chat object with the help of ID provided*/
    message = await message.populate('chat');
    /*Below line populates the name email pic of the other users present in that chat (eg: Grp chat with 5 users, all 5 users details will be populated)*/
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name pic email',
    });
    /*After populating updating all data updating the latest message in the chat collection*/
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while sending message' });
    throw new Error('Something went wrong while sending message');
  }
});

const getAllMessages = expressAsyncHandler(async (req, res) => {
  if (!req.params.chatId) {
    return res.status(400).send({ message: 'Please provide chatId' });
  }
  const { chatId } = req.params;
  try {
    let messages = await Message.find({ chat: chatId }).populate('sender', 'name pic email').populate('chat');
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while fetching messages' });
    throw new Error('Something went wrong while fetching messages');
  }
});

module.exports = { sendMessage, getAllMessages };
