const express = require('express');
const { userController } = require('../controllers');
const { validateCreateUserInputs } = require('../middlewares/userValidation');
const { validateJWT } = require('../middlewares/jwtValidation');

const router = express.Router();

router.post('/', validateCreateUserInputs, userController.createUser);
router.get('/', validateJWT, userController.getAllUsers);

module.exports = router;