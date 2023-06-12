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

module.exports = {
  createUser,
};