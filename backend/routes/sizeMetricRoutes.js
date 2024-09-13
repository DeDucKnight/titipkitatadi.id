const express = require('express');
const sizeMetricController = require('../controllers/sizeMetricController');

const router = express.Router();

router.post('/categories', sizeMetricController.create_size_metric);
router.get('/categories', sizeMetricController.get_size_metrics);
router.get('/categories/:categoryid', sizeMetricController.get_size_metric_by_id);
router.put('/categories/:categoryid', sizeMetricController.update_size_metric);
// router.delete('/categories/:categoryid', sizeMetricController.delete_category);

// router.put('/category-details/:categorydetailid', sizeMetricController.update_category_detail);
// router.delete('/category-details/:categorydetailid', sizeMetricController.delete_category_detail);

module.exports = router;
