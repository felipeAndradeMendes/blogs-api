const express = require('express');
const { categoryController } = require('../controllers');
const { validateJWT } = require('../middlewares/jwtValidation');
const { validateCategory } = require('../middlewares/categoryValidation');

const router = express.Router();

router.post('/', validateJWT, validateCategory, categoryController.addCategory);

module.exports = router;
