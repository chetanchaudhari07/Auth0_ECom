const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const checkJwt = require('../middleware/checkjwt'); 
const checkRole = require('../middleware/checkaccess');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', checkJwt, checkRole('admin,seller'), productController.createProduct);
router.put('/:id', checkJwt, checkRole('admin,seller'), productController.updateProduct);
router.delete('/:id', checkJwt, checkRole('admin'), productController.deleteProduct);

module.exports = router;