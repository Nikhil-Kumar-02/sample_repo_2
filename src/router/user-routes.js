const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');

router.post('/signUp',userController.create);
router.delete('/remUser/:id',userController.deleteUser);
router.post('/signIn' , userController.signIn);

module.exports = router;