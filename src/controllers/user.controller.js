const { userService } = require('../services');
const { createToken } = require('../utils/JWT');

const createUser = async (req, res) => {
  try {
    const { displayName, id, email } = req.body;

    const verifyEmail = await userService.verifyExistingEmail(email);
    console.log('VERIFY EMAIL:', verifyEmail);
    if (verifyEmail && verifyEmail.type) {
      return res.status(409).json({ message: verifyEmail.message });
    }
    
    const newUser = await userService.createUser(req.body);
    if (!newUser) {
      return res.status(500).json({ message: newUser });
    }
    const payload = { displayName, id };

    const token = createToken(payload);

    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (user.type) {
      return res.status(404).json({ message: user.message });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    await userService.deleteUser(userId);

    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};