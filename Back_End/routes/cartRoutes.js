const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const checkJwt = require('../middleware/checkjwt');
const checkRole = require('../middleware/checkaccess');

router.post('/add', checkJwt, checkRole('buyer,seller,admin'), cartController.addToCart);
router.get('/', checkJwt, checkRole('buyer,seller,admin'), cartController.getCart);

module.exports = router;