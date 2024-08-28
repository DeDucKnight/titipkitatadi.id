const { Product, ProductImage, ProductCategory, Category, CategoryDetail, Image } = require('../models');

// Get Product List with Pagination
exports.get_product_list = async (req, res) => {
    const { page = 1 } = req.query;
    const limit = 8;
    const offset = (parseInt(page, 10) - 1) * limit;

    try {
        const products = await Product.findAll({
            include: [
                {
                    model: ProductImage,
                    where: { isdefault: true },
                    attributes: ['productimageid', 'imageid', 'color', 'isdefault'],
                    include: {
                        model: Image,
                        attributes: ['imagepath']
                    }
                },
                {
                    model: ProductCategory,
                    include: {
                        model: CategoryDetail,
                        attributes: ['categorydetailid', 'categoryid', 'categorydetailname'],
                        include: {
                            model: Category,
                            attributes: ['categoryid', 'categoryname'],
                        }
                    }
                }
            ],
            order: [['createddate', 'DESC']],
            limit: limit,
            offset: offset
        });

        res.status(200).json({
            products: products,
            currentPage: parseInt(page, 10),
            nextPage: products.length === limit ? parseInt(page, 10) + 1 : null,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Get Product by ID
exports.get_product_detail = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findOne({
            where: { productid: productId },
            include: [
                {
                    model: ProductImage,
                    include: {
                        model: Image,
                        attributes: ['imagepath']
                    }
                },
                {
                    model: ProductCategory,
                    include: [
                        {
                            model: Category,
                            attributes: ['categoryid', 'categoryname']
                        },
                        {
                            model: CategoryDetail,
                            attributes: ['categorydetailid', 'categorydetailname']
                        }
                    ]
                }
            ]
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch product details' });
    }
};

// Create a New Product with Images
exports.create_product = async (req, res) => {
    const { ProductName, Description, Price, DiscountPrice, Brand, Colors, Sizes, Material, OnlineStores, Status, Images } = req.body;

    try {
        const product = await Product.create({
            productname: ProductName,
            description: Description,
            price: Price,
            discountprice: DiscountPrice,
            brand: Brand,
            colors: Colors,
            sizes: Sizes,
            material: Material,
            onlinestores: OnlineStores,
            status: Status,
        });

        if (Images && Images.length > 0) {
            for (const x of Images) {
                const image = await Image.create({
                    imagepath: x.ImagePath,
                    imagetype: x.ImageType,
                    status: true
                });

                await ProductImage.create({
                    productid: product.productid,
                    imageid: image.imageid,
                    color: x.Color,
                    isdefault: x.IsDefault,
                    status: true
                });
            }
        }

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

// Update a Product by ID
exports.update_product = async (req, res) => {
    const { productId } = req.params;
    const updates = req.body;

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.update(updates);
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// Delete a Product by ID
exports.delete_product = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
