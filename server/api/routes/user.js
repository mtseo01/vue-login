const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/account', userController.getUserInfo);

router.post('/signup', userController.singup);
router.post('/login', userController.login);

// router.get('/:userId', userController.getUserInfo);

module.exports = router;
