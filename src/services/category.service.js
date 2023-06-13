const { Category } = require('../models');

const addCategory = async (name) => {
  const newCategory = await Category.create({
    name,
  });

  return newCategory;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getCategoryById = async (categoryId) => {
  const categoryPromises = categoryId.map((category) => Category.findOne({
      where: { id: category },
    }));

  const result = await Promise.all(categoryPromises);

  return result;
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
};