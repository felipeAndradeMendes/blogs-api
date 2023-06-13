const { BlogPost, PostCategory } = require('../models');

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

module.exports = {
  addPost,
};