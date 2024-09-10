const express = require('express');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

router.get('/wishlist/:customerid', wishlistController.get_wishlist);
router.post('/wishlist', wishlistController.create_wishlist);
router.delete('/wishlist', wishlistController.delete_wishlist);

module.exports = router;
