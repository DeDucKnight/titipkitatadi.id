const express = require('express');
const imageController = require('../controllers/imageController');

const router = express.Router();

router.post('/upload-image', imageController.upload_image);
router.post('/upload-product-image/:productId', imageController.upload_product_image);
router.post('/upload-image-test', imageController.upload_image_test);
router.get('/get-image-test', imageController.get_image_test);

module.exports = router;