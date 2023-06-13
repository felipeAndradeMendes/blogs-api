const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, JWT_SECRET, jwtConfig);

const validateToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  createToken,
  validateToken,
};