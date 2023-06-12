const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email({
    minDomainSegments: 1,
  }).required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

module.exports = {
  userSchema,
};