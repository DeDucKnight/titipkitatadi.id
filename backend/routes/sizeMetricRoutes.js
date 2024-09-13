const express = require('express');
const sizeMetricController = require('../controllers/sizeMetricController');

const router = express.Router();

router.post('/size-metrics', sizeMetricController.create_size_metric);
router.get('/size-metrics', sizeMetricController.get_size_metrics);
router.get('/size-metrics/:sizemetricid', sizeMetricController.get_size_metric_by_id);
router.put('/size-metrics/:sizemetricid', sizeMetricController.update_size_metric);
// router.delete('/categories/:categoryid', sizeMetricController.delete_category);

// router.put('/category-details/:categorydetailid', sizeMetricController.update_category_detail);
// router.delete('/category-details/:categorydetailid', sizeMetricController.delete_category_detail);

module.exports = router;
