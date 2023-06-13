const { BlogPost } = require('../models');

const addPost = async (postObj) => {
  const { title, content, categoryIds } = postObj;
  const newPost = await BlogPost.create({
    title, content, categoryIds,
  });

  return newPost;
};

module.exports = {
  addPost,
};