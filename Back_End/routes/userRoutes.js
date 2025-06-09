const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const checkJwt = require('../middleware/checkjwt');
const checkRole = require('../middleware/checkaccess');


router.post('/register', userController.register);


router.post('/login', userController.login);

module.exports = router;