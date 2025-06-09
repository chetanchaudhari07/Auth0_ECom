const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/wishlistController');
const checkJwt = require('../middleware/checkjwt');
const checkRole = require('../middleware/checkaccess');

router.post('/add', checkJwt, checkRole('buyer,seller,admin'), wishlistController.addToWishlist);
router.get('/', checkJwt, checkRole('buyer,seller,admin'), wishlistController.getWishlist);

module.exports = router;
