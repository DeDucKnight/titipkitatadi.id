const { Category, CategoryDetail, sequelize } = require('../models');

// Create a New Category & Category Details
exports.create_category = async (req, res) => {
    const { categoryname, isstandard, categorydetails } = req.body;
    
    const t = await sequelize.transaction();
    try {
        // Create Category
        const category = await Category.create({
            categoryname,
            isstandard,
        }, { transaction: t });

        // Bulk Create CategoryDetails
        if (categorydetails && categorydetails.length > 0) {
            const categoryDetailsToInsert = categorydetails.map(detail => ({
                categoryid: category.categoryid,
                categorydetailname: detail.categorydetailname,
            }));

            await CategoryDetail.bulkCreate(categoryDetailsToInsert, { transaction: t });
        }

        await t.commit();
        res.status(201).json({ message: 'Category created successfully', category });

    } catch (err) {
        await t.rollback();
        console.error('Error creating category:', err);
        res.status(500).json({ error: 'Failed to create category' });
    }
};

// Get All Categories
exports.get_categories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: {
                model: CategoryDetail,
                attributes: ['categorydetailid', 'categorydetailname'],
            },
            order: [['createddate', 'ASC']]
        });
        res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

// Get Category by Id
exports.get_category = async (req, res) => {
    const { categorid } = req.params;

    try {
        const category = await Category.findByPk(categorid, {
            include: {
                model: CategoryDetail,
                attributes: ['categorydetailid', 'categorydetailname'],
            }
        });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (err) {
        console.error('Error fetching category:', err);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};

// Update a Category by ID
exports.update_category = async (req, res) => {
    const { categoryid } = req.params;
    const updates = req.body;

    const t = await sequelize.transaction();
    try {
        // Update Category
        const category = await Category.findByPk(categoryid, { transaction: t });

        if (!category) {
            await t.rollback();
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.update(updates, { transaction: t });

        // Update Category Details
        if (updates.CategoryDetails && updates.CategoryDetails.length > 0) {
            // Fetch existing CategoryDetails related to this category
            const existingCategoryDetails = await CategoryDetail.findAll({
                where: { categoryid },
                transaction: t
            });

            const existingCategoryDetailIds = existingCategoryDetails.map(detail => detail.categorydetailid);
            const newCategoryDetails = updates.CategoryDetails.map(detail => detail.categorydetailid);

            // Bulk Update or Create Category Details
            const updatesToApply = [];
            const newDetailsToCreate = [];

            for (const detail of updates.CategoryDetails) {
                const categorydetailid = detail.categorydetailid;

                if (existingCategoryDetailIds.includes(categorydetailid)) {
                    // Add to update list
                    updatesToApply.push({
                        categorydetailid: categorydetailid,
                        categorydetailname: detail.categorydetailname,
                        categoryid: categoryid
                    });
                } else {
                    // Add to create list
                    newDetailsToCreate.push({
                        categorydetailid: categorydetailid,
                        categorydetailname: detail.categorydetailname,
                        categoryid: categoryid
                    });
                }
            }

            // Apply bulk updates
            if (updatesToApply.length > 0) {
                await Promise.all(updatesToApply.map(detail => 
                    CategoryDetail.update(detail, {
                        where: { categorydetailid: detail.categorydetailid },
                        transaction: t
                    })
                ));
            }

            // Apply bulk creates
            if (newDetailsToCreate.length > 0) {
                await CategoryDetail.bulkCreate(newDetailsToCreate, { transaction: t });
            }

            // Remove CategoryDetails that are no longer in the request
            const detailsToRemove = existingCategoryDetails.filter(
                detail => !newCategoryDetails.includes(detail.categorydetailid)
            );

            if (detailsToRemove.length > 0) {
                await CategoryDetail.destroy({
                    where: {
                        categorydetailid: detailsToRemove.map(detail => detail.categorydetailid)
                    },
                    transaction: t
                });
            }
        }

        await t.commit();
        res.status(200).json({ message: 'Category updated successfully', category });

    } catch (err) {
        await t.rollback();
        console.error('Error updating category:', err);
        res.status(500).json({ error: 'Failed to update category' });
    }
};

// Delete a Category by ID
exports.delete_category = async (req, res) => {
    const { categoryid } = req.params;

    const t = await sequelize.transaction();
    try {
        // Find the category by primary key
        const category = await Category.findByPk(categoryid, { transaction: t });

        if (!category) {
            await t.rollback();
            return res.status(404).json({ message: 'Category not found' });
        }

        // Delete the category
        await category.destroy({ transaction: t });

        await t.commit();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        await t.rollback();
        console.error('Error deleting category:', err);
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

// Update a Category Detail by ID
exports.update_category_detail = async (req, res) => {
    const { categorydetailid } = req.params;
    const updates = req.body;

    try {
        const categoryDetail = await CategoryDetail.findByPk(categorydetailid);

        if (!categoryDetail) {
            return res.status(404).json({ message: 'Category Detail not found' });
        }

        await categoryDetail.update(updates);
        res.status(200).json({ message: 'Category detail updated successfully', category });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update category detail' });
    }
};

// Delete a Category Detail by ID
exports.delete_category_detail = async (req, res) => {
    const { categorydetailid } = req.params;

    try {
        const categoryDetail = await CategoryDetail.findByPk(categorydetailid);

        if (!categoryDetail) {
            return res.status(404).json({ message: 'Category detail not found' });
        }

        await categoryDetail.destroy();
        res.status(200).json({ message: 'Category detail deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete category detail' });
    }
};
