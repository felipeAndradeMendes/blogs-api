const { categorySchema } = require('./joi.schema');

const validateCategory = (req, res, next) => {
  const categoryInputs = req.body;

  const { error } = categorySchema.validate(categoryInputs);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = {
  validateCategory,
};