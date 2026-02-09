const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController.js');
const authUser = require('../../middlewares/user/authUser.js');

router.post('/create-user', userController.addUser);
router.post('/login', userController.loginUser)
router.put('/update-user/:userId', authUser, userController.updateUser)
router.delete('/delete-user/:userId', authUser, userController.deleteUser)

module.exports = router;
