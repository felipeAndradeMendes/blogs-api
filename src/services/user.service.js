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

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  console.log('USER BY ID:', user);

  if (!user) {
    return {
      type: 'error',
      message: 'User does not exist',
    };
  }

  return user;
};

module.exports = {
  createUser,
  verifyExistingEmail,
  getAllUsers,
  getUserById,
};