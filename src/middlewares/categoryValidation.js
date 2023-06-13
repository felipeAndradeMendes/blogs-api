const { categorySchema, newPostSchema } = require('./joi.schema');

const validateCategory = (req, res, next) => {
  const categoryInputs = req.body;

  const { error } = categorySchema.validate(categoryInputs);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

const validateCategoryArrayFormat = async (req, res, next) => {
  const newPostInputs = req.body;
  const { error } = newPostSchema.validate(newPostInputs);

  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = {
  validateCategory,
  validateCategoryArrayFormat,
};