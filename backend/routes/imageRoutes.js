const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/imageController');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/' // Temporary folder to store the uploaded images
});

router.post('/upload-image/:productId?', upload.single('file'), imageController.upload_image);
router.post('/upload-image-test', imageController.upload_image_test);
router.get('/images', imageController.get_images);
router.get('/images/:productId', imageController.get_images_by_productid);
router.get('/get-image-test', imageController.get_image_test);
router.delete('/delete-image/:imageId', imageController.delete_image);
router.put('/update-image-properties/', imageController.update_image_by_cdnid);

// Dev
router.post('/bulk-upload-images', imageController.bulk_create_images);

module.exports = router;