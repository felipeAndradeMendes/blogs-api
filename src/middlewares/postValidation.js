const { updatePostSchema } = require('./joi.schema');

const validatePostInputs = async (req, res, next) => {
  const postInput = req.body;
  const { error } = updatePostSchema.validate(postInput); 

  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = {
  validatePostInputs,
};