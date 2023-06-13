const { User } = require('../models');

const login = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email, password },    
  });

  if (!user) {
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