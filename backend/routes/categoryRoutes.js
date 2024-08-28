const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/categories', categoryController.create_category);
router.get('/categories', categoryController.get_categories);
router.put('/categories/:categoryId', categoryController.update_category);
router.delete('/categories/:categoryId', categoryController.delete_category);

router.put('/category-details/:categoryDetailId', categoryController.update_category_detail);
router.delete('/category-details/:categoryDetailId', categoryController.delete_category_detail);

module.exports = router;
