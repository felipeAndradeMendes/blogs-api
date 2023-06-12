const { User } = require('../models');

const login = async ({ email, password }) => {
  const user = await User.findAll({
    where: { email, password },    
  });

  if (!user.length) {
    return {
      type: 'error',
      message: 'Invalid fields',
    };
  }

  return user;
};

module.exports = {
  login,
};