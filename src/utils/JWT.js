const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const createToken = (payload) => jwt.sign(payload, JWT_SECRET);

module.exports = {
  createToken,
};