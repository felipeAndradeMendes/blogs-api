const { User } = require('../models');

const verifyExistingEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  console.log('USER:', user);

  if (user) {
    return {
      type: 'error',
      message: 'User already registered',
    };
  }

  return user;
};

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
  verifyExistingEmail,
};