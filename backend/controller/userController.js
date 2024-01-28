const expressAsyncHandler = require('express-async-handler');
const User = require('../models/User');
const { generateJwtToken } = require('../helpers/auth.helper');
const AWS = require('aws-sdk');

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
        pic: newUser.pic,
        token: generateJwtToken({ _id: newUser._id, name: newUser.name, email: newUser.email }),
      });
    } else {
      response.send(500).json({ message: 'Something went wrong while creating user' });
      throw new Error('Something went wrong while creating user');
    }
  }
});

const loginUser = expressAsyncHandler(async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    response.send(400).json({ message: 'Missing email or password' });
    throw new Error('Missing email or password');
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    response.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateJwtToken({ _id: user._id, name: user.name, email: user.email }),
    });
  } else {
    response.status(404).json({ message: 'User not found! Please sign up' });
    throw new Error('User not found! Please sign up');
  }
});

const uploadProfilePicture = expressAsyncHandler(async (request, response) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.PROFILE_PIC_BUCKET,
    Key: `yolo-chat-profile-pics/${Date.now()}-${request.file.originalname}`,
    Body: request.file.buffer,
    ContentType: request.file.mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading to S3:', err);
      return response.status(500).send('Error uploading to S3');
    }

    const imageUrl = data.Location;
    response.json({ imageUrl });
  });
});

const searchUsers = expressAsyncHandler(async (request, response) => {
  const query = request.query.keyword
    ? {
        $or: [
          { name: { $regex: request.query.keyword, $options: 'i' } },
          { email: { $regex: request.query.keyword, $options: 'i' } },
        ],
      }
    : {};
  console.log(request.user)
  const users = await User.find(query).find({ _id: { $ne: request.user._id } });
  console.log(users);
  response.status(200).json(users);
});

module.exports = { signUpUser, loginUser, uploadProfilePicture, searchUsers };
