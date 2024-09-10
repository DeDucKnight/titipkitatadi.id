const express = require('express');
const identityController = require('../controllers/identityController.js');

const router = express.Router();

router.post('/admin-login', identityController.admin_login);
router.post('/customer-login', identityController.customer_login);
router.post('/admin-create', identityController.create_user_admin);

module.exports = router;
