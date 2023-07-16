const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');
const { authRequestValidator } = require('../middleware/index');

router.post('/signUp',authRequestValidator.validateUser,userController.create);
router.delete('/remUser/:id',userController.deleteUser);
router.post('/signIn' ,authRequestValidator.validateUser , userController.signIn);

module.exports = router;