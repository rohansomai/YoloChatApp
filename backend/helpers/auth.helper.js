const jwt = require('jsonwebtoken');
const generateJwtToken = (payload) => {
  return jwt.sign({ ...payload }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { generateJwtToken };
