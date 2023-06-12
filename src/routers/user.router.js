const express = require('express');
const { userController } = require('../controllers');
const { validateCreateUserInputs } = require('../middlewares/userValidation');

const router = express.Router();

router.post('/', validateCreateUserInputs, userController.createUser);

module.exports = router;