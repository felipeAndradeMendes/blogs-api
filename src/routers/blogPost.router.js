const express = require('express');
const { blogPostController } = require('../controllers');
const { validateJWT } = require('../middlewares/jwtValidation');
const { validateCategoryArrayFormat } = require('../middlewares/categoryValidation');
const { validatePostInputs } = require('../middlewares/postValidation');

const router = express.Router();

router.post('/', validateJWT, validateCategoryArrayFormat, blogPostController.addPost);
router.get('/', validateJWT, blogPostController.getAllBlogPosts);
router.get('/:id', validateJWT, blogPostController.getBlogPostById);
router.put('/:id', validateJWT, validatePostInputs, blogPostController.updateBlogPost);

module.exports = router;