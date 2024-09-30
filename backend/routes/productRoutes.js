const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/products', productController.get_product_list);
router.get('/products/:productId', productController.get_product_detail);
router.get('/products-search', productController.get_product_by_name);
router.get('/products-category/:categorydetailid', productController.get_products_by_category_detail);
router.get('/products-category-parent/:categoryid', productController.get_products_by_category);
router.post('/products', productController.create_product);
router.put('/products/:productId', productController.update_product);
router.delete('/products/:productId', productController.delete_product);

module.exports = router;
