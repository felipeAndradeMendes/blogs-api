const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

const addPost = async (postObj) => {
  const { title, content, categoryIds, id } = postObj;
  const newPost = await BlogPost.create({
    title, content, categoryIds, userId: id,
  });
  
  if (newPost) {
    const categorysPromises = categoryIds.map((category) => PostCategory.create({
        postId: newPost.id,
        categoryId: category,
      }));
    
    await Promise.all(categorysPromises);
  }
  
  return newPost;
};

const getAllBlogPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
     {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
  ],
  });

  return posts;
};

const getBlogPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
  {
    model: Category,
    as: 'categories',
    through: { attributes: [] },
  }],
  });

  return post;
};

const updateBlogPost = async (id, title, content) => {
  const [updatedPost] = await BlogPost.update(
    { title, content },
    { where: { id } },    
  );
  console.log('UPDATED POST:', updatedPost);

  return updatedPost;
};

const verifyPostUser = async (postId, userId) => {
  const post = await BlogPost.findOne({
    where: { id: postId },
  });

  return post.userId === userId;
};

const deletePost = async (id) => {
  const post = await BlogPost.destroy({
    where: { id },
  });

  return post;
};

const searchPost = async (q) => {
  const post = await BlogPost.findAll({
    where: {
      [Op.or]: [
        {
          title: { [Op.like]: `%${q}%` },
        },
        {
          content: { [Op.like]: `%${q}%` },
        },
      ],
    },
  });

  return post;
};

module.exports = {
  addPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  verifyPostUser,
  deletePost,
  searchPost,
};