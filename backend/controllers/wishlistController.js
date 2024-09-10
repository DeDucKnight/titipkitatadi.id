const { Customer, Product, Wishlist, sequelize } = require('../models');

// Get wishlist
exports.get_wishlist = async (req, res) => {
    const { customerid } = req.params; 

    if (!customerid) {
        return res.status(400).json({ error: 'Customer ID is required' });
    }

    try {
        const wishlist = await Wishlist.findAll({
            where: { customerid },
            include: {
                model: Product,
                attributes: ['productid', 'productname', 'price', 'discountprice'],
            }
        });

        if (!wishlist.length) {
            return res.status(404).json({ message: 'No wishlist items found for this customer' });
        }

        res.status(200).json(wishlist);
    } catch (err) {
        console.error('Error fetching wishlist:', err);
        res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
};

// Create a new wishlist item
exports.create_wishlist = async (req, res) => {
    const { customerid, productid } = req.body;

    if (!customerid || !productid) {
        return res.status(400).json({ error: 'Customer ID and Product ID are required' });
    }

    try {
        // Check if the wishlist item already exists
        const existingWishlistItem = await Wishlist.findOne({
            where: { customerid, productid }
        });

        if (existingWishlistItem) {
            return res.status(409).json({ error: 'This product is already in the customer\'s wishlist' });
        }

        // Create a new wishlist item
        const wishlist = await Wishlist.create({
            customerid,
            productid,
        });

        res.status(201).json({ message: 'Wishlist item created successfully', wishlist });
    } catch (err) {
        console.error('Error creating wishlist:', err);
        res.status(500).json({ error: 'Failed to create wishlist item' });
    }
};

// Delete a wishlist item
exports.delete_wishlist = async (req, res) => {
    const { customerid, productid } = req.body;

    // Validate input
    if (!customerid || !productid) {
        return res.status(400).json({ error: 'Customer ID and Product ID are required' });
    }

    try {
        // Delete the wishlist item directly
        const deletedRows = await Wishlist.destroy({
            where: { customerid, productid }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ error: 'Wishlist item not found' });
        }

        res.status(200).json({ message: 'Wishlist item deleted successfully' });
    } catch (err) {
        console.error('Error deleting wishlist:', err);
        res.status(500).json({ error: 'Failed to delete wishlist item' });
    }
};
