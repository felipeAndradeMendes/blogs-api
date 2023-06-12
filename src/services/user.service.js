const { User } = require('../models');

const createUser = async (userObj) => {
  const { displayName, email, password, image } = userObj;
  const newUser = await User.create({
    displayName,
    email,
    password,
    image,
  });

  return newUser;
};

module.exports = {
  createUser,
};