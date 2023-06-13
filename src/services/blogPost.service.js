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

module.exports = {
  addPost,
  getAllBlogPosts,
  getBlogPostById,
};