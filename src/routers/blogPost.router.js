const express = require('express');
const { blogPostController } = require('../controllers');
const { validateJWT } = require('../middlewares/jwtValidation');
const { validateCategoryArrayFormat } = require('../middlewares/categoryValidation');

const router = express.Router();

router.post('/', validateJWT, validateCategoryArrayFormat, blogPostController.addPost);

module.exports = router;