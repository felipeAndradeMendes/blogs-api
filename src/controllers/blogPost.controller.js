const { blogPostService, categoryService } = require('../services');
const { verifyPostUser } = require('../services/blogPost.service');

const addPost = async (req, res) => {
  try {
    const { categoryIds } = req.body;
    const verifyCategories = await categoryService.getCategoryById(categoryIds);
    
    if (verifyCategories.some((category) => category === null)) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }

    const { id } = req.user;
    const postInfos = req.body;
    const postObj = { id, ...postInfos };
    const newPost = await blogPostService.addPost(postObj);

    return res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getAllBlogPosts = async (req, res) => {
  try {
    const posts = await blogPostService.getAllBlogPosts();
    
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getBlogPostById = async (req, res) => {
 try {
  const { id } = req.params;
  const post = await blogPostService.getBlogPostById(id);

  if (!post) {
    console.log('ROTA POST BY ID');
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(post);
 } catch (error) {
  console.log(error);
  return res.status(500).json(error.message);
 }
};

const updateBlogPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, content } = req.body;

    if (!await verifyPostUser(id, userId)) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    const updatePost = await blogPostService.updateBlogPost(id, title, content);

    if (updatePost === 0) {
      return res.status(500).json({ message: 'Post escolhido não foi atualizado' });
    }

    const newPost = await blogPostService.getBlogPostById(id);

    return res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!await blogPostService.getBlogPostById(id)) {
    console.log('ROTA DELETE POST');
      return res.status(404).json({ message: 'Post does not exist' });
    }
    
    if (!await verifyPostUser(id, userId)) {
      return res.status(401).json({ message: 'Unauthorized user' }); 
    }

    await blogPostService.deletePost(id);

    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const searchPost = async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await blogPostService.searchPost(q);

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  addPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deletePost,
  searchPost,
};

// OK! 1- resolver timestamps de criação e update 
// OK! 2- Usar req.user para armazenar user id, vindo do token
// OK! 3- fazer atualização da tabela post_categories tb, ver transactions
// OK! 4- implementar Joi para checar inputs