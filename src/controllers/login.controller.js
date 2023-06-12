const { loginService } = require('../services');
const { createToken } = require('../utils/JWT');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email.length || !password.length) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await loginService.login({ email, password });

    if (user.type) {
      return res.status(400).json({ message: user.message });
    }

    const payload = { displayName: user.displayName, id: user.id };

    const token = createToken(payload);

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  login,
};