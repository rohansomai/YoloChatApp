const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded: ", decoded);
      req.user = await User.findById(decoded._id).select('-password');
      console.log("req: ", req);
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized!');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Please provide a token');
  }
});

module.exports = { protect };
