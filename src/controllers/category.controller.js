const { categoryService } = require('../services');

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await categoryService.addCategory(name);

    return res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();

    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  addCategory,
  getAllCategories,
};