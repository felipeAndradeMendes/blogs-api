const express = require('express');
const { blogPostController } = require('../controllers');
const { validateJWT } = require('../middlewares/jwtValidation');

const router = express.Router();

router.post('/', validateJWT, blogPostController.addPost);

module.exports = router;