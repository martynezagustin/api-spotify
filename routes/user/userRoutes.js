const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController.js');

router.post('/create-user', userController.addUser);

module.exports = router;
