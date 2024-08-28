const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/products', productController.get_product_list);
router.get('/products/:productId', productController.get_product_detail);
router.post('/products', productController.create_product);
router.put('/products/:productId', productController.update_product);
router.delete('/products/:productId', productController.delete_product);

module.exports = router;
