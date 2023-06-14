const express = require('express');
const { userController } = require('../controllers');
const { validateCreateUserInputs } = require('../middlewares/userValidation');
const { validateJWT } = require('../middlewares/jwtValidation');

const router = express.Router();

router.post('/', validateCreateUserInputs, userController.createUser);
router.get('/', validateJWT, userController.getAllUsers);
router.get('/:id', validateJWT, userController.getUserById);
router.delete('/me', validateJWT, userController.deleteUser);

module.exports = router;