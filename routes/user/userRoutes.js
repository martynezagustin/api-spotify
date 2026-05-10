const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController.js');
const authUser = require('../../middlewares/user/authUser.js');

router.post('/users', userController.addUser);
router.post('/login', userController.loginUser)
router.put('/users/me', authUser, userController.updateUser)
router.get('/users/:userId', userController.getUser)
router.delete('/users/me', authUser, userController.deleteUser)

module.exports = router;
