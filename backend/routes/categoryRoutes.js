const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/categories', categoryController.create_category);
router.get('/categories', categoryController.get_categories);
router.get('/categories/:categoryid', categoryController.get_category);
router.put('/categories/:categoryid', categoryController.update_category);
router.delete('/categories/:categoryid', categoryController.delete_category);

router.put('/category-details/:categorydetailid', categoryController.update_category_detail);
router.delete('/category-details/:categorydetailid', categoryController.delete_category_detail);

module.exports = router;
