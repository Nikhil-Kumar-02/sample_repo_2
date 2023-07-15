const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');

router.post('/newUser',userController.create);
router.delete('/remUser',userController.deleteUser);

module.exports = router;