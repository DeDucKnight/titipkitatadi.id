const express = require('express');
const identityController = require('../controllers/identityController.js');

const router = express.Router();

router.post('/admin-login', identityController.admin_login);
router.post('/customer-login', identityController.customer_login);
router.post('/admin-create', identityController.create_user_admin);
router.post('/customer-create', identityController.create_customer);
router.delete('/customer/:email', customerController.delete_customer_by_email);
router.get('/admins', identityController.get_admins);
router.get('/customers', identityController.get_customers);
router.delete('/admin/:userid', identityController.delete_admin);
router.delete('/customer/:customerid', identityController.delete_customer);

module.exports = router;
