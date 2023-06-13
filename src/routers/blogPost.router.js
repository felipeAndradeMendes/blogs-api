const express = require('express');
const { blogPostController } = require('../controllers');
const { validateJWT } = require('../middlewares/jwtValidation');
const { validateCategoryArrayFormat } = require('../middlewares/categoryValidation');

const router = express.Router();

router.post('/', validateJWT, validateCategoryArrayFormat, blogPostController.addPost);
router.get('/', validateJWT, blogPostController.getAllBlogPosts);
router.get('/:id', validateJWT, blogPostController.getBlogPostById);

module.exports = router;