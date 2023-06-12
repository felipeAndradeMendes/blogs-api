const { userService } = require('../services');

const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  createUser,
};