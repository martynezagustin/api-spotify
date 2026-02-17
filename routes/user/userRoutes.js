const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController.js');
const authUser = require('../../middlewares/user/authUser.js');

router.post('/create-user', userController.addUser);
router.post('/login', userController.loginUser)
router.put('/update', authUser, userController.updateUser)
router.get('/users/:userId', userController.getUser)
router.delete('/delete', authUser, userController.deleteUser)

module.exports = router;
