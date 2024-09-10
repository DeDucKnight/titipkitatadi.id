const express = require('express');
const identityController = require('../controllers/identityController.js');

const router = express.Router();

router.post('/admin-login', identityController.admin_login);
router.post('/customer-login', identityController.customer_login);
router.post('/admin-create', identityController.create_user_admin);
router.post('/customer-create', identityController.create_customer);
router.delete('/customer/:email', customerController.delete_customer_by_email);

module.exports = router;
