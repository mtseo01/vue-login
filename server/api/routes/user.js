const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/auth', userController.auth);

router.post('/login', userController.login);

module.exports = router;
