const { Product, ProductImage, ProductCategory, Category, CategoryDetail, Image, SizeMetric, SizeAttribute, ProductSizeMetric, ProductRecommendation, sequelize } = require('../models');
const { Op } = require('sequelize');

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
                        as: 'Image',
                        attributes: ['imagepath']
                    },
                    required: false
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

        // If no products found
        if (!products || products.length === 0) {
            return res.status(200).json({
                message: 'No products found',
                products: [],
                currentPage: parseInt(page, 10),
                nextPage: null,
            });
        }

        // Send response with product data and pagination info
        res.status(200).json({
            products: products,
            currentPage: parseInt(page, 10),
            nextPage: products.length === limit ? parseInt(page, 10) + 1 : null,
        });
    } catch (err) {
        console.error('Error fetching product list:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Get Product by ID
exports.get_product_detail = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByPk(productId, {
            include: [
                {
                    model: ProductImage,
                    include: {
                        model: Image,
                        as: 'Image',
                        attributes: ['imagepath']
                    }
                },
                {
                    model: ProductCategory,
                    include: [
                        {
                            model: CategoryDetail,
                            attributes: ['categorydetailid', 'categorydetailname'],
                            include: [
                                {
                                    model: Category,
                                    attributes: ['categoryid', 'categoryname']
                                }
                            ]
                        }                        
                    ]
                },
                {
                    model: ProductSizeMetric,
                    include: [
                        {
                            model: SizeAttribute,
                            attributes: ['sizeattributeid', 'sizeattributename'],
                            include: [
                                {
                                    model: SizeMetric,
                                    attributes: ['sizemetricid', 'sizemetricname']
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const recommendedProducts = await ProductRecommendation.findAll({
            where: { productid: productId },
            include: [
                {
                    model: Product,
                    as: 'RecommendedProduct',
                    attributes: ['productname', 'price', 'discountprice', 'colors'],
                    include: [
                        {
                            model: ProductImage,
                            attributes: ['imageid'],
                            include: {
                                model: Image,
                                as: 'Image',
                                attributes: ['imagepath', 'cdnid']
                            }
                        }
                    ]
                }
            ]
        });

        const productData = product.toJSON();
        productData.ProductRecommendations = recommendedProducts?.length ? recommendedProducts.map((x) => x.toJSON()) : [];
        
        res.status(200).json(productData);
    } catch (err) {
        console.error('Error fetching product details:', err);
        res.status(500).json({ error: 'Failed to fetch product details' });
    }
};

// Search products by name
exports.get_product_by_name = async (req, res) => {
    
    try {
        const { query } = req.query;

        if (!query || query.trim() === "") {
            return res.status(400).json({ message: 'Search query is required.' });
        }

        // Perform search using Sequelize's LIKE operator for case-insensitive search
        const products = await Product.findAll({
            where: {
                productname: {
                    [Op.like]: `%${query}%`
                }
            },
            // where: { productname: query},
            attributes: ['productid', 'productname', 'price', 'discountprice', 'colors'],
            include: [
                {
                    model: ProductCategory,
                    attributes: ['categorydetailid'],
                    include: [
                        {
                            model: CategoryDetail,
                            attributes: ['categorydetailname'],
                            include: [
                                {
                                    model: Category,
                                    attributes: ['categoryname']
                                }
                            ]
                        }
                    ]
                }
            ]
        }, {
            logging: console.log
        });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found matching your search.' });
        }

        // Return the found products
        res.status(200).json(products);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'An error occurred while searching for products.' });
    }
}

// Get Products by CategoryDetailID
exports.get_products_by_category_detail = async (req, res) => {
    const { categorydetailid } = req.params;
    const { page = 1 } = req.query;
    const limit = 8;
    const offset = (parseInt(page, 10) - 1) * limit;

    // Validate categorydetailid
    if (!categorydetailid) {
        return res.status(400).json({ error: 'Category Detail ID is required' });
    }

    try {
        // Fetch products with an extra limit to check if there's a next page
        const products = await Product.findAll({
            include: [
                {
                    model: ProductCategory,
                    where: { categorydetailid },
                    include: [
                        {
                            model: CategoryDetail,
                            attributes: ['categorydetailname'],
                            include: [
                                {
                                    model: Category,
                                    attributes: ['categoryname']
                                }
                            ]
                        }
                    ]
                }
            ],
            order: [['createddate', 'DESC']],
            limit: limit + 1,
            offset: offset
        });

        // If no products found
        if (!products || products.length === 0) {
            return res.status(200).json({
                message: 'No products found',
                products: [],
                currentPage: parseInt(page, 10),
                nextPage: null,
            });
        }

        const hasNextPage = products.length > limit; // Check if there's a next page
        const results = hasNextPage ? products.slice(0, limit) : products; // Return only limit results

        res.status(200).json({
            products: results,
            currentPage: parseInt(page, 10),
            nextPage: hasNextPage ? parseInt(page, 10) + 1 : null,
        });
    } catch (err) {
        console.error('Error fetching products by category detail:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Get Products by CategoryID
exports.get_products_by_category = async (req, res) => {
    const { categoryid } = req.params;
    const { page = 1 } = req.query;
    const limit = 8;
    const offset = (parseInt(page, 10) - 1) * limit;

    // Validate categoryid
    if (!categoryid) {
        return res.status(400).json({ error: 'Category ID is required' });
    }

    try {
        // Fetch products with an extra limit to check if there's a next page
        const products = await Product.findAll({
            include: [
                {
                    model: ProductCategory,
                    include: [
                        {
                            model: CategoryDetail,
                            attributes: ['categorydetailname', 'categoryid'],
                            where: { categoryid },
                            include: [
                                {
                                    model: Category,
                                    attributes: ['categoryname'],                                    
                                }
                            ]
                        }
                    ]
                }
            ],
            order: [['createddate', 'DESC']],
            limit: limit + 1,
            offset: offset
        });

        // If no products found
        if (!products || products.length === 0) {
            return res.status(200).json({
                message: 'No products found',
                products: [],
                currentPage: parseInt(page, 10),
                nextPage: null,
            });
        }

        const hasNextPage = products.length > limit; // Check if there's a next page
        const results = hasNextPage ? products.slice(0, limit) : products; // Return only limit results

        res.status(200).json({
            products: results,
            currentPage: parseInt(page, 10),
            nextPage: hasNextPage ? parseInt(page, 10) + 1 : null,
        });
    } catch (err) {
        console.error('Error fetching products by category detail:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Create a New Product
exports.create_product = async (req, res) => {
    const { 
        productname, price, discountprice, brand, colors, sizes, material, onlinestores, shipping, status, sizemetricid,
        ProductImages, ProductCategories, ProductSizeMetrics, ProductRecommendations 
    } = req.body;

    const t = await sequelize.transaction();

    try {
        // Create Product
        const product = await Product.create({
            productname,
            price: parseInt(price, 10) || 0,
            discountprice: parseInt(discountprice, 10) || 0,
            brand,
            colors,
            sizes,
            material,
            onlinestores,
            shipping,
            status,
            sizemetricid
        }, { transaction: t });

        // Bulk Create Product Images
        if (ProductImages && ProductImages.length > 0) {
            const imagesToInsert = ProductImages.map(image => ({
                productid: product.productid,
                imageid: image.imageid,
                color: image.color,
                isdefault: image.isdefault
            }));

            await ProductImage.bulkCreate(imagesToInsert, { transaction: t });
        }

        // Bulk Create Product Categories
        if (ProductCategories && ProductCategories.length > 0) {
            const categoriesToInsert = ProductCategories.map(category => ({
                productid: product.productid,
                categorydetailid: category.categorydetailid
            }));

            await ProductCategory.bulkCreate(categoriesToInsert, { transaction: t });
        }

        //Bulk Create Product Size Metrics
        if (ProductSizeMetrics && ProductSizeMetrics.length > 0) {
            const metricsToInsert = ProductSizeMetrics.map(metric => ({
                productid: product.productid,
                sizeattributeid: metric.sizeattributeid,
                measurements: metric.measurements
            }));

            await ProductSizeMetric.bulkCreate(metricsToInsert, { transaction: t });
        }

        //Bulk Create Product Recommendations
        if (ProductRecommendations && ProductRecommendations.length > 0) {
            const recommendationToInsert = ProductRecommendations.map(item => ({
                productid: product.productid,
                recommendedproductid: item.recommendedproductid,
            }));

            await ProductRecommendation.bulkCreate(recommendationToInsert, { transaction: t });
        }

        await t.commit();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        // Rollback transaction in case of an error
        await t.rollback();
        console.error('Error creating product:', err);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

// Update a Product by ID
exports.update_product = async (req, res) => {
    const { productId } = req.params;
    const updates = req.body;

    const t = await sequelize.transaction();
    try {
        // Find the product by ID
        const product = await Product.findByPk(productId, { transaction: t });

        if (!product) {
            await t.rollback();
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update the product
        await product.update(updates, { transaction: t });

        // Handle Product Categories
        if (updates.ProductCategories) {
            // Fetch existing product categories
            const existingProductCategories = await ProductCategory.findAll({
                where: { productid: productId },
                transaction: t
            });

            // Map existing category IDs and new category IDs
            const existingCategoryIds = existingProductCategories.map(cat => cat.categorydetailid);
            const newCategoryIds = updates.ProductCategories.map(cat => cat.categorydetailid);

            // Add new categories
            for (const category of updates.ProductCategories) {
                const categoryId = category.categorydetailid;
                const exists = existingCategoryIds.includes(categoryId);

                if (!exists) {
                    await ProductCategory.create({
                        productid: productId,
                        categorydetailid: categoryId
                    }, { transaction: t });
                }
            }

            // Remove categories that are no longer present
            for (const existingCategory of existingProductCategories) {
                if (!newCategoryIds.includes(existingCategory.categorydetailid)) {
                    await ProductCategory.destroy({
                        where: { productcategoryid: existingCategory.productcategoryid },
                        transaction: t
                    });
                }
            }
        }

        // Handle Product Size Metrics
        if (updates.ProductSizeMetrics) {
            // Fetch existing Product Size Metric
            const existingProductSizeMetrics = await ProductSizeMetric.findAll({
                where: { productid: productId },
                transaction: t
            });
        
            // Map existing size attribute IDs and new size attribute IDs
            const newMetricIds = updates.ProductSizeMetrics.map(metric => metric.sizeattributeid);
        
            // Add new size metrics or update existing ones
            for (const metric of updates.ProductSizeMetrics) {
                const metricId = metric.sizeattributeid;
                const existingMetric = existingProductSizeMetrics.find(m => m.sizeattributeid === metricId);
        
                if (!existingMetric) {
                    // Add new size metric if it doesn't exist
                    await ProductSizeMetric.create({
                        productid: productId,
                        sizeattributeid: metricId,
                        measurements: metric.measurements
                    }, { transaction: t });
                } else if (JSON.stringify(existingMetric.measurements) !== JSON.stringify(metric.measurements)) {
                    // Update existing size metric if measurements have changed
                    await ProductSizeMetric.update({
                        measurements: metric.measurements
                    }, {
                        where: { sizeattributeid: metricId, productid: productId },
                        transaction: t
                    });
                }
            }
        
            // Remove size metrics that are no longer present
            for (const existingMetric of existingProductSizeMetrics) {
                if (!newMetricIds.includes(existingMetric.sizeattributeid)) {
                    await ProductSizeMetric.destroy({
                        where: { sizeattributeid: existingMetric.sizeattributeid },
                        transaction: t
                    });
                }
            }
        }

        // Handle Product Recommendations
        if (updates.ProductRecommendations) {
            // Fetch existing Product Recommendations for the product
            const existingProductRecommendations = await ProductRecommendation.findAll({
                where: { productid: productId },
                transaction: t
            });

            // Map existing recommended product IDs and new recommended product IDs
            const newRecommendationIds = updates.ProductRecommendations.map(rec => rec.recommendedproductid);

            // Add new recommendations or update existing ones
            for (const rec of updates.ProductRecommendations) {
                const recommendedProductId = rec.recommendedproductid;
                const existingRecommendation = existingProductRecommendations.find(r => r.recommendedproductid === recommendedProductId);

                if (!existingRecommendation) {
                    // Add new recommendation if it doesn't exist
                    await ProductRecommendation.create({
                        productid: productId,
                        recommendedproductid: recommendedProductId
                    }, { transaction: t });
                }
            }

            // Remove recommendations that are no longer present
            for (const existingRec of existingProductRecommendations) {
                if (!newRecommendationIds.includes(existingRec.recommendedproductid)) {
                    await ProductRecommendation.destroy({
                        where: { productrecommendationid: existingRec.productrecommendationid },
                        transaction: t
                    });
                }
            }
        }

        await t.commit();
        updates.productid = productId
        res.status(200).json({ message: 'Product updated successfully', product:  updates });
    } catch (err) {
        await t.rollback();
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// Delete a Product
exports.delete_product = async (req, res) => {
    const { productId } = req.params;
    
    const t = await sequelize.transaction();
    try {
        const product = await Product.findByPk(productId, { transaction: t });

        if (!product) {
            await t.rollback();
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy({ transaction: t }); // Ensure it's part of the transaction

        await t.commit();
        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (err) {
        await t.rollback();
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};