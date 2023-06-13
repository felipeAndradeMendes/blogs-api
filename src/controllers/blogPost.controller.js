const { blogPostService } = require('../services');

const addPost = async (req, res) => {
  try {
    const postObj = req.body;
    const newPost = await blogPostService.addPost(postObj);

    return res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  addPost,
};

// OK! 1- resolver timestamps de criação e update 
// 2- Usar req.user para armazenar user id, vindo do token
// 3- fazer atualização da tabela post_categories tb, ver transactions
// 4- implementar Joi para checar inputs