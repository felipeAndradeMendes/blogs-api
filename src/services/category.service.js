const { Category } = require('../models');

const addCategory = async (name) => {
  const newCategory = await Category.create({
    name,
  });

  return newCategory;
};

module.exports = {
  addCategory,
};