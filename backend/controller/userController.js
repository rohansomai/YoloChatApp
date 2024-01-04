const expressAsyncHandler = require('express-async-handler');
const User = require('../models/User');
const { generateJwtToken } = require('../helpers/auth.helper');

const signUpUser = expressAsyncHandler(async (request, response) => {
  const { name, email, password, pic } = request.body;
  if (!name || !email || !password) {
    response.status(400).json({ message: 'Please enter all the required details' });
    throw new Error('Please enter all the required details');
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    response.status(409).json({ message: 'This user already exists!! Login to continue' });
    throw new Error('This user already exists!! Login to continue');
  } else {
    const newUser = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (newUser) {
      response.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        pic: newUser.pic,
        token: generateJwtToken({ _id: newUser._id, name: newUser.name, email: newUser.email }),
      });
    } else {
      response.send(500).json({ message: 'Something went wrong while creating user' });
      throw new Error('Something went wrong while creating user');
    }
  }
});
module.exports = { signUpUser };
