const { userSchema } = require('./joi.schema');

const validateCreateUserInputs = async (req, res, next) => {
  const userInputs = req.body;
  
  const { error } = userSchema.validate(userInputs);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = {
  validateCreateUserInputs,
};